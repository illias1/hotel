import React from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { loadStripe } from "@stripe/stripe-js";

import { useRouter } from "next/router";
import { Modal, Button } from "antd";

import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
import awsExports from "../src/aws-exports";

import Authenticator from "../components/molecules/Authenticator";

import {
  CreateReservationMutation,
  CreateReservationMutationVariables,
  CreateRoomBookingInput,
  CreateRoomBookingMutation,
  CreateRoomBookingMutationVariables,
} from "../src/API";
import { createReservation, createRoomBooking } from "../src/graphql/mutations";

import { checkAvailabilityForRoomType } from "../utils/checkAvailablityForRoomType";
import callGraphQL from "../utils/api";
import { parseCheckoutUrl, ValidationError } from "../utils/parseCheckoutUrl";
import CheckoutForm from "../components/organs/CheckoutForm";
import { SESSION } from "../constants";

Amplify.configure({ ...awsExports, ssr: true });

interface ICreateRoomBookingForCheckout extends CreateRoomBookingInput {
  roomName: string;
}
type IUserForm = {
  phone: string;
  address: string;
};
type ICheckoutProps = {
  validationError: boolean;
  bookings?: ICreateRoomBookingForCheckout[];
};

const Checkout: React.FC<ICheckoutProps> = ({ validationError, bookings }) => {
  const [editableBookings, setEditableBookings] = React.useState<ICreateRoomBookingForCheckout[]>(
    []
  );
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [paymentStages, setPaymentStages] = React.useState<string[]>([]);
  const router = useRouter();
  const { t } = useTranslation();

  React.useEffect(() => {
    setEditableBookings(bookings);
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const removeBooking = (index: number) => {
    setEditableBookings((bookings) => bookings.filter((_, i) => i != index));
  };
  const handlePay = async () => {
    try {
      setLoading(true);
      const user = await Auth.currentAuthenticatedUser();
      const { attributes } = user;
      let stripeCustomerId = attributes["custom:stripeId"];
      setPaymentStages((prev) => [...prev, "Collected your user information"]);
      console.log("stripecustomrer id", stripeCustomerId);

      if (!stripeCustomerId) {
        await fetch("/api/stripe-customer", { method: "post" });
        setPaymentStages((prev) => [...prev, "Created your payment identity"]);
      }

      const { data } = await callGraphQL<
        CreateReservationMutation,
        CreateReservationMutationVariables
      >(createReservation, {
        input: {
          customerID: attributes.sub,
          isPaid: false,
          note: "",
        },
      });
      const reservation = data.createReservation;
      console.log("reservation", reservation);
      bookings.forEach(async (booking) => {
        const { data } = await callGraphQL<
          CreateRoomBookingMutation,
          CreateRoomBookingMutationVariables
        >(createRoomBooking, {
          input: {
            checkOut: booking.checkOut,
            checkIn: booking.checkIn,
            reservationID: reservation.id,
            roomTypeId: booking.roomTypeId,
            roomID: booking.roomID,
            people: booking.people,
          },
        });
        console.log("creating booking", data.createRoomBooking.id);
      });
      setPaymentStages((prev) => [...prev, "Set up your booking"]);
      const stripeSession = await fetch("/api/stripe-session", {
        method: "post",
        body: reservation.id,
      });
      const session = await stripeSession.json();
      localStorage.setItem(SESSION, JSON.stringify(session));
      console.log("stripeSession", session);
      const stripePromise = loadStripe("pk_test_i1MTP027q8zLCkbTZrDKj1GO00JhaQrWNy");
      const stripe = await stripePromise;
      setLoading(false);
      setPaymentStages((prev) => [...prev, "Redirecting to stripe to complete your payment"]);
      setTimeout(async () => {
        setIsModalVisible(false);
        if (stripe) {
          const { error } = await stripe!.redirectToCheckout({
            sessionId: session.id,
          });
          if (error) {
            console.error("Error from network!", error);
          }
        } else {
          console.error("No stripe!");
        }
      }, 1500);
    } catch (payError) {
      console.warn("pay error", payError);
    }
  };

  if (validationError) {
    return <div>Url is corrupted</div>;
  }
  if (!bookings) return <div>Something went wrong</div>;
  return (
    <>
      <Modal
        title="Please login first"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handlePay}>
            Pay
          </Button>,
        ]}
      >
        <Authenticator>
          <CheckoutForm />
          {paymentStages.map((stage) => (
            <div key={stage}>{stage}</div>
          ))}
        </Authenticator>
      </Modal>
      Checkout
      {/* <div>
        {t("pages.checkout.policies")
          .split("\n")
          .map((line) => (
            <p>{line}</p>
          ))}
      </div> */}
      {editableBookings.map(({ checkOut, checkIn, roomName, roomTypeId }, index) => (
        <div key={`${index}-${roomTypeId}`}>
          <div>{roomName}</div>
          <div>{roomName}</div>
          {checkIn} - {checkOut}
          <button onClick={() => removeBooking(index)}>Remove</button>
          <button onClick={() => showModal()}>pay</button>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ICheckoutProps> = async ({
  req,
  query,
  locale,
}) => {
  const SSR = withSSRContext({ req });
  try {
    const validatedUrlParams = parseCheckoutUrl(query);
    const completeBookingInput = [];
    validatedUrlParams.forEach((booking) => {
      completeBookingInput.push(checkAvailabilityForRoomType(booking));
    });
    return {
      props: {
        validationError: false,
        bookings: completeBookingInput,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error.message);
      return {
        props: {
          validationError: true,
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
    }
  }
};

export default Checkout;
