import React from "react";
import Link from "next/link";
import { Result } from "antd";

import { PageWrapper } from "../../atoms/Layout";

type ISomethingWentWrongProps = {
  message?: string;
};

const SomethingWentWrong: React.FC<ISomethingWentWrongProps> = ({ message }) => {
  return (
    <PageWrapper>
      <Result
        status="500"
        title={message ? message : "Sorry, something went wrong."}
        extra={
          <Link href="/">
            <a>Back Home</a>
          </Link>
        }
      />
    </PageWrapper>
  );
};

export default SomethingWentWrong;
