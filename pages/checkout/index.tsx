import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "next-i18next";
import { Modal, Button, Steps } from "antd";
import { UserOutlined, EuroCircleOutlined, SmileOutlined } from "@ant-design/icons";

import awsExports from "../../src/aws-exports";

import Authenticator from "../../components/molecules/Authenticator";

import { ICheckoutBooking } from "../../utils/parseCheckoutUrl";
import { SESSION } from "../../constants";
import Navigation from "../../components/organs/Navigation";
import { getCookieUser } from "../../utils/general";
import { IAvailableRoomType } from "../../utils/reservation/checkAvailabilities";
import Amplify from "aws-amplify";
import { IRoomType } from "../../utils/db";
import { ISessionReservation } from "../api/stripe-session";
import Image from "next/image";
import SomethingWentWrong from "../../components/organs/Wrong";

const { Step } = Steps;

Amplify.configure({ ...awsExports, ssr: true });

interface IBookingForCheckout extends ICheckoutBooking {
  roomType: IRoomType;
}
export interface IBookingResultForCheckout {
  booking: IBookingForCheckout;
  availableRoomType: IAvailableRoomType;
}

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
  bookings: IBookingResultForCheckout[];
  cookieUser?: IUser | null;
};

const Checkout: React.FC<ICheckoutProps> = () => {
  const [editableBookings, setEditableBookings] = React.useState<IBookingResultForCheckout[]>([]);
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

  React.useEffect(() => {
    if (data) {
      setEditableBookings(data.bookings);
    }
  }, [data]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const removeBooking = (index: number) => {
    setEditableBookings((bookings) => bookings.filter((_, i) => i != index));
  };

  const handlePay = async () => {
    try {
      setPaymentStages((prev) => [...prev, "Setting up your booking"]);
      const reservationParams: ISessionReservation = {
        note: customerNote,
        bookings: editableBookings
          .filter((booking) => booking.availableRoomType)
          .map((booking) => booking.availableRoomType),
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
  if (!data.bookings) return <div>Something went wrong</div>;
  return (
    <>
      <Modal
        title="Please login first"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>
            Back
          </Button>,
        ]}
      >
        <Authenticator
          loginCallback={(user) => {
            setUser(getCookieUser(user));
            closeModal();
          }}
        />
      </Modal>
      <Steps>
        <Step status="process" title="Confirmation" icon={<UserOutlined />} />
        <Step status="wait" title="Pay" icon={<EuroCircleOutlined />} />
        <Step status="wait" title="Done" icon={<SmileOutlined />} />
      </Steps>

      {editableBookings.map(({ booking, availableRoomType }, index) => {
        if (!availableRoomType) {
          return <div>{t(booking.roomType.name)} is not available anymore</div>;
        }
        const { checkIn, checkOut, id, name, images, hotelId } = availableRoomType;
        return (
          <div key={`${index}-${id}`}>
            <div>{t(name)}</div>
            {checkIn} - {checkOut}
            <Image
              width={100}
              height={100}
              src={images[0]}
              alt={`Image for room ${name} in hotel ${hotelId}`}
            />
            <button onClick={() => removeBooking(index)}>Remove</button>
          </div>
        );
      })}
      <div>
        {t("pages.checkout.policies")
          .split("\n")
          .map((line, i) => (
            <p key={i}>{line}</p>
          ))}
      </div>
      <input type="text" value={customerNote} onChange={(e) => setCustomerNote(e.target.value)} />
      <div>
        {user ? (
          <div>
            <button onClick={handlePay}>Pay</button>
            We will record the following contact information: {user.name}, {user.email},{" "}
            {user.phone}
          </div>
        ) : (
          <div>
            You have to login first
            <button onClick={() => showModal()}>Login</button>
          </div>
        )}
      </div>
      <div>
        <p style={{ color: "red" }}>{checkoutError}</p>
      </div>
      {paymentStages.map((stage) => (
        <div key={stage}>
          <p>{stage}</p>
        </div>
      ))}
      <Navigation />
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
