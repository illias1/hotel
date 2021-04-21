import { Auth } from "aws-amplify";

async function resendConfirmationCode(email: string) {
  try {
    await Auth.resendSignUp(email);
    console.log("code resent successfully");
  } catch (err) {
    console.error("error resending code: ", err);
  }
}

export const signOut = async (callback: () => void) => {
  try {
    await Auth.signOut();
    callback();
  } catch (error) {
    console.log("error signing out: ", error);
  }
};

