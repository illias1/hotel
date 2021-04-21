import React from "react";
import { Label } from "../../atoms/Typography";

type ICardProps = {
  imageUrl: string;
  label: string;
};

const Card: React.FC<ICardProps> = ({ imageUrl, label }) => {
  return (
    <div style={{ backgroundImage: imageUrl }}>
      <Label>{label}</Label>
    </div>
  );
};

export default Card;
