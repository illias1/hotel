import React from "react";
import { TFunction } from "next-i18next";
import Image from "next/image";
import { Section } from "../components/atoms/Section";
import { IHotel } from "../utils/db";
import { H3, Paragraph } from "../components/atoms/Typography";
import { Slider } from "./Slider";
import styled from "styled-components";

type IHomeSectionProps = {
  hotel: IHotel;
  t: TFunction;
};

const StyledImage = styled.img`
  height: 100%;
  margin-right: 10px;
  /* max-width: 40%; */
`;

const HomeSection: React.FC<IHomeSectionProps> = ({ hotel, t }) => {
  return (
    <Section>
      <H3>{t(hotel.name)}</H3>
      <Paragraph>{t(hotel.description)}</Paragraph>
      <Slider>
        {hotel.images.map((url, index) => (
          // <div>
          <StyledImage src={url} alt={`Image ${index} for hotel ${t(hotel.name)}`} />
          // </div>
        ))}
      </Slider>
    </Section>
  );
};

export default HomeSection;
