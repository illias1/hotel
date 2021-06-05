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
  top: 30%;
  @media (max-width: 400px) {
    flex-direction: column;
    top: 5%;
  }
`;

export const StayInfoSelectRoot = styled.div`
  background: #393939;
  border-radius: 30px 30px 0px 0px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 42px 18px;
  max-width: 600px;
  bottom: -50px;
  position: absolute;
`;

const HomeHeader = styled.div`
  position: relative;
  min-height: 60vh;
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  opacity: 0.5;
  object-fit: cover;
  width: 100%;
  position: absolute;
  max-height: 60vh;
`;

const HomeTitle: React.FC<IHomeTitleProps> = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <div style={{ background: "black", lineHeight: 2, marginBottom: 50 }}>
      <HomeHeader>
        {
          // @ts-ignore
          <StyledImage src="https://ik.imagekit.io/alquileres/headerCalpe_6TmVsBhqe.jpg" />
        }
        <HomeH1>{t("pages.home.title")}</HomeH1>
        <StayInfoSelectRoot>
          <StayInfoSelect />
        </StayInfoSelectRoot>
      </HomeHeader>
    </div>
  );
};

export default HomeTitle;
