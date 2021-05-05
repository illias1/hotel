import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "next-i18next";
import { Modal, Button, Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  EuroCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { Amplify, withSSRContext } from "aws-amplify";
import awsExports from "../../src/aws-exports";

import Authenticator from "../../components/molecules/Authenticator";

import { CreateRoomBookingInput } from "../../src/API";
import { createReservation, createRoomBooking } from "../../src/graphql/mutations";

import { checkAvailabilityForRoomType } from "../../utils/checkAvailablityForRoomType";
import callGraphQL from "../../utils/api";
import { parseCheckoutUrl, ValidationError } from "../../utils/parseCheckoutUrl";
import { SESSION } from "../../constants";
import { PATHS } from "../../utils/paths";
import Link from "next/link";
import Navigation from "../../components/organs/Navigation";
import { getCookieUser } from "../../utils/general";

Amplify.configure({ ...awsExports, ssr: true });

const { Step } = Steps;

export interface ICreateRoomBookingForCheckout extends CreateRoomBookingInput {
  roomName: string;
}
type IUserForm = {
  phone: string;
  address: string;
};
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
  bookings: ICreateRoomBookingForCheckout[];
  cookieUser?: IUser | null;
};

const Checkout: React.FC<ICheckoutProps> = ({
  validationError,
  bookings,
  cookieUser,
  unknownError,
}) => {
  const [editableBookings, setEditableBookings] = React.useState<ICreateRoomBookingForCheckout[]>(
    []
  );
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [user, setUser] = React.useState<IUser | null>(cookieUser);
  const [paymentStages, setPaymentStages] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string>("");

  const { t } = useTranslation();
  const router = useRouter();

  React.useEffect(() => {
    setEditableBookings(bookings);
  }, []);
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
      showModal();
      setPaymentStages((prev) => [...prev, "Setting up your booking"]);
      const body = JSON.stringify(bookings);
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
              setError(error.message);
            }
          }, 1500);
        } else {
          console.error("No stripe!");
          setError("Couldn't connect to Stripe.");
        }
      } else {
        const text = await stripeSession.text();
        setError(text);
      }
    } catch (payError) {
      console.warn("pay error", payError);
      setError("Something went wrong, please try again");
    }
  };

  if (validationError) {
    return <div>Url is corrupted</div>;
  }
  if (unknownError) {
    return <div>Something went wrong</div>;
  }
  if (!bookings) return <div>Something went wrong</div>;
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

      <div>is authenticated: {JSON.stringify(cookieUser)}</div>
      {editableBookings.map(({ checkOut, checkIn, roomName, roomTypeId }, index) => (
        <div key={`${index}-${roomTypeId}`}>
          <div>{roomName}</div>
          <div>{roomName}</div>
          {checkIn} - {checkOut}
          <button onClick={() => removeBooking(index)}>Remove</button>
        </div>
      ))}
      <div>
        {t("pages.checkout.policies")
          .split("\n")
          .map((line, i) => (
            <p key={i}>{line}</p>
          ))}
      </div>
      <div>
        {
          user ? <div>
            We will record the following contact information: {user.name}, {user.email}, {user.phone}
          </div> : <div>
            You have to login first
          </div>
        }
      </div>
      <button onClick={handlePay}>Pay</button>
      <Navigation />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ICheckoutProps> = async ({
  req,
  query,
  locale,
}) => {
  const { Auth } = withSSRContext({ req });

  try {
    const validatedUrlParams = parseCheckoutUrl(query);
    const completeBookingInput = [];
    validatedUrlParams.forEach((booking) => {
      completeBookingInput.push(checkAvailabilityForRoomType(booking));
    });

    let user = null;
    try {
      user = await Auth.currentAuthenticatedUser();
    } catch {
      return {
        props: {
          cookieUser: null,
          validationError: false,
          bookings: completeBookingInput,
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
    }

    return {
      props: {
        validationError: false,
        bookings: completeBookingInput,
        cookieUser: getCookieUser(user),
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.log("here");
    if (error instanceof ValidationError) {
      console.error(error.message);
      return {
        props: {
          validationError: true,
          bookings: [],
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
    }

    console.error("Unknown error at checkout server side props:", error);
    return {
      props: {
        unknownError: true,
        validationError: false,
        bookings: [],
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
};

export default Checkout;
