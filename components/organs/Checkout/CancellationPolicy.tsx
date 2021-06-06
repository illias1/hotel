import React from "react";
import { TFunction } from "next-i18next";

import { Flex } from "../../atoms/Section";
import { Space } from "../../atoms/Layout";
import { H3, SmallText } from "../../atoms/Typography";
import { Divider } from "antd";

type ICancellationPolicyProps = {
  t: TFunction;
};

const CancellationPolicy: React.FC<ICancellationPolicyProps> = ({ t }) => {
  return (
    <Space margin="5px 24px">
      <H3>Cancellation Policy</H3>
      <div>
        {t("pages.checkout.policies")
          .split("\n")
          .map((line, i) => (
            <SmallText key={i}>{line}</SmallText>
          ))}
      </div>
      <Divider />

      <SmallText>{t("pages.checkout.agreement")}</SmallText>
    </Space>
  );
};

export default CancellationPolicy;
