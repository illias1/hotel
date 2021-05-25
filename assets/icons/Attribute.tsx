import React from "react";
import styled from "styled-components";
import HairDryer from "./attributes/HairDryer";
import Air from "./attributes/Air";
import Bath from "./attributes/Bath";
import Disabled from "./attributes/Disabled";
import Safe from "./attributes/Safe";
import TV from "./attributes/TV";
import Wifi from "./attributes/Wifi";
import Iron from "./attributes/Iron";
import Laundry from "./attributes/Laundry";
import Dishwasher from "./attributes/Dishwasher";
import Coffee from "./attributes/Coffee";
import Oven from "./attributes/Oven";
import Balcony from "./attributes/Balcony";
import Closet from "./attributes/Closet";

type IAttributeIconProps = {
  name: string;
};

export const AttributeSVG = styled.svg`
  color: #000;
  width: 14px;
  height: 12.25px;
`;

const AttributeIcon: React.FC<IAttributeIconProps> = ({ ...props }) => {
  switch (props.name) {
    case "wifi":
      return <Wifi />;
    case "balcony":
    case "small_terrace":
    case "big_terrace":
    case "small_balcony":
      return <Balcony />;
    case "closet_in_every_room":
      return <Closet />;
    case "air_conditioner":
      return <Air />;
    case "private_bathroom":
    case "mayor_bathrooms":
      return <Bath />;
    case "tv_satellite":
    case "tv":
      return <TV />;
    case "safe":
      return <Safe />;
    case "disabled_friendly":
      return <Disabled />;
    case "hair_dryer":
      return <HairDryer />;
    case "iron":
      return <Iron />;
    case "washing_machine":
      return <Laundry />;
    case "dishwasher":
      return <Dishwasher />;
    case "coffee_machine":
      return <Coffee />;
    case "oven":
      return <Oven />;
    default:
      return <></>;
  }
};

export default AttributeIcon;
