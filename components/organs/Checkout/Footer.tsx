import React from "react";
import { TFunction } from "next-i18next";

import { Flex } from "../../atoms/Section";
import { Space } from "../../atoms/Layout";
import { H3, Paragraph, SmallText } from "../../atoms/Typography";
import { Divider } from "antd";
import Translation from "../../molecules/Translation";
import { Footer } from "antd/lib/layout/layout";
import Link from "next/link";

type ICheckoutFooterProps = {
  t: TFunction;
};

const CheckoutFooter: React.FC<ICheckoutFooterProps> = ({ t }) => {
  return (
    <Space margin="5px 24px">
      <Translation />
      <Paragraph>© 2021 Alquileres la Morada, Inc.</Paragraph>
      <Link href="/privacy">
        <a>Privacy</a>
      </Link>
      <Link href="/terms">
        <a>Terms</a>
      </Link>
    </Space>
  );
};

export default CheckoutFooter;
