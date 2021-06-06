import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "next-i18next";
import { Modal, Steps, Divider, Input } from "antd";
import { UserOutlined, EuroCircleOutlined, SmileOutlined } from "@ant-design/icons";

import awsExports from "../../src/aws-exports";

import Authenticator from "../../components/molecules/Authenticator";

import { SESSION } from "../../constants";
import { getCookieUser } from "../../utils/general";
import { IAvailableRoomType } from "../../utils/reservation/checkAvailabilities";
import Amplify from "aws-amplify";
import { IRoomType } from "../../utils/db";
import { ISessionReservation } from "../api/stripe-session";
import SomethingWentWrong from "../../components/organs/Wrong";
import { Flex } from "../../components/atoms/Section";
import LeftChevronIcon from "../../assets/icons/LeftChevron";
import { H1, H2, H3, H4, Paragraph, Text } from "../../components/atoms/Typography";
import RoomsEnum from "../../components/organs/Checkout/RoomsEnum";
import YourTrip from "../../components/organs/Checkout/YourTrip";
import CancellationPolicy from "../../components/organs/Checkout/CancellationPolicy";
import Footer from "../../components/organs/Checkout/Footer";
import Button from "../../components/atoms/Button";
import { Space } from "../../components/atoms/Layout";
import Header from "../../components/molecules/Header";

const { TextArea } = Input;

Amplify.configure({ ...awsExports, ssr: true });

interface IUser {
  username: string;
  email: string;
  name: string;
  phone: string;
  stripeId: string;
}
export type ICheckoutProps = {
  validationError: boolean;
  unknownError?: boolean;
  booking: IAvailableRoomType;
};

const Checkout: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [user, setUser] = React.useState<IUser | null>(null);
  const [customerNote, setCustomerNote] = React.useState<string>("");
  const [paymentStages, setPaymentStages] = React.useState<string[]>([]);
  const [checkoutError, setCheckoutError] = React.useState<string>("");

  const { t } = useTranslation();
  const router = useRouter();
  const { data, error } = useSWR<ICheckoutProps>("/api" + router.asPath, (...args) =>
    // @ts-ignore
    fetch(...args).then((res) => res.json())
  );
  console.log("data", data);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handlePay = async () => {
    try {
      setPaymentStages((prev) => [...prev, "Setting up your booking"]);
      const reservationParams: ISessionReservation = {
        note: customerNote,
        booking: data.booking,
      };
      const body = JSON.stringify(reservationParams);
      console.log("body", body);
      const stripeSession = await fetch("/api/stripe-session", { method: "post", body });
      console.log("stripeSession", stripeSession);
      if (stripeSession.status == 200) {
        setPaymentStages((prev) => [...prev, "Your booking draft created"]);
        const session = await stripeSession.json();
        localStorage.setItem(SESSION, JSON.stringify(session));
        console.log("stripeSession", session);
        const stripe = await loadStripe("pk_test_i1MTP027q8zLCkbTZrDKj1GO00JhaQrWNy");
        if (stripe) {
          setPaymentStages((prev) => [...prev, "Redirecting to stripe to complete your payment"]);
          setTimeout(async () => {
            const { error } = await stripe!.redirectToCheckout({
              sessionId: session.id,
            });
            if (error) {
              console.error("Error from network!", error);
              setCheckoutError(error.message);
            }
          }, 1000);
        } else {
          console.error("No stripe!");
          setCheckoutError("Couldn't connect to Stripe.");
        }
      } else {
        const text = await stripeSession.text();
        setCheckoutError(text);
      }
    } catch (payError) {
      console.warn("pay error", payError);
      setCheckoutError("Something went wrong, please try again");
    }
  };

  if (error) {
    return <SomethingWentWrong />;
  }
  if (!data) {
    return <div>Loading</div>;
  }
  if (data.validationError) {
    return <SomethingWentWrong message="Url is corrupted" />;
  }
  if (data.unknownError) {
    return <SomethingWentWrong />;
  }
  if (!data.booking) return <SomethingWentWrong />;
  return (
    <>
      <Modal
        title="Please login first"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Authenticator
          t={t}
          loginCallback={(user) => {
            setUser(getCookieUser(user));
            closeModal();
          }}
        />
      </Modal>
      <Header isAlsoBigScreens text="" title="Confirm and pay">
        <div style={{ color: "transparent" }}>f</div>
      </Header>

      <RoomsEnum availableRoomType={data.booking} t={t} />
      <Divider />
      <YourTrip t={t} availableRoomType={data.booking} />
      <Divider />
      <Space margin="5px 24px">
        <H3>Price details</H3>
        {data.booking.total.map(({ price, quantity }, index) => (
          <Flex key={index}>
            <Text>
              {price} € x {quantity} night(s){" "}
              {data.booking.total.length > 1 &&
                price == data.booking.total.map((a) => a.price).sort((a, b) => b - a)[0] &&
                "(weekend)"}
            </Text>
            <Text>{price * quantity} €</Text>
          </Flex>
        ))}
        <Space margin="20px 0 0 0">
          <Flex>
            <Text primary>Total</Text>
            <Text primary>
              {data.booking.total.reduce((prev, { quantity, price }) => prev + quantity * price, 0)}{" "}
              €
            </Text>
          </Flex>
        </Space>
      </Space>
      <Divider />
      <CancellationPolicy t={t} />
      <Divider />

      <div>
        {user ? (
          <>
            <Space margin="16px 24px">
              <Paragraph>Confirmation email will be sent to {user.email}</Paragraph>
              <TextArea
                placeholder="Your additional request"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                rows={3}
              />
            </Space>
            <Space margin="16px 24px">
              <Button onClick={handlePay}>Confirm and pay</Button>
            </Space>
          </>
        ) : (
          <div style={{ padding: "16px 24px" }}>
            <Button onClick={() => showModal()}>Proceed to guest info</Button>
          </div>
        )}
      </div>
      <Flex justify="center">
        <Paragraph style={{ color: "red" }}>{checkoutError}</Paragraph>
      </Flex>
      <Footer t={t} />
    </>
  );
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default Checkout;
