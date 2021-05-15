import React from "react";
import Head from "next/head";

type IHeadProps = {};

const HeadComponent: React.FC<IHeadProps> = ({ ...props }) => {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.jpg" />
    </Head>
  );
};

export default HeadComponent;
