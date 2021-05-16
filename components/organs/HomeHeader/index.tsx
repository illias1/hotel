import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import { H1 } from "../../atoms/Typography";
import styled from "styled-components";
import StayInfoSelect from "../../molecules/StayInfoSelect";

type IHomeTitleProps = {};

const HomeH1 = styled(H1)`
  color: white;
  position: absolute;
  top: 5%;
  left: 5%;
`;

export const StayInfoSelectRoot = styled.div`
  background: #393939;
  border-radius: 30px 30px 0px 0px;
  margin-top: -20px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 42px 18px;
`;

const HomeTitle: React.FC<IHomeTitleProps> = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <div style={{ background: "black", lineHeight: 1 }}>
      <div style={{ opacity: 0.5, minHeight: "30vh", position: "relative" }}>
        <Image priority layout="fill" objectFit="cover" src="/headerCalpe.jpg" />
      </div>
      <HomeH1>{t("pages.home.title")}</HomeH1>
      <StayInfoSelectRoot>
        <StayInfoSelect />
      </StayInfoSelectRoot>
    </div>
  );
};

export default HomeTitle;
