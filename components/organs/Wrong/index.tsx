import React from "react";
import { PageWrapper } from "../../atoms/Layout";

type ISomethingWentWrongProps = {
  message?: string;
};

const SomethingWentWrong: React.FC<ISomethingWentWrongProps> = ({ message }) => {
  return (
    <PageWrapper>
      <div>{message ? message : "Something went wrong"}</div>
    </PageWrapper>
  );
};

export default SomethingWentWrong;
