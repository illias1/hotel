import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Select } from "antd";

import Button from "../../atoms/Button";
import { StyledRangePicker } from "../../atoms/RangePicker";
import { StyledSelect } from "../../atoms/Select";
import {
  LOCAL_STORAGE_CHECK_IN,
  LOCAL_STORAGE_CHECK_OUT,
  LOCAL_STORAGE_PEOPLE,
} from "../../../constants";
import styled from "styled-components";
import { GuestSelect, SelectsWrapper } from "./components";

const { Option } = Select;

type IStayInfoSelectProps = {
  first?: string;
  maxPeople?: number;
};

type IFormInputs = {
  checkIn: string;
  checkOut: string;
  peopleCount: number;
};

const initialForm: IFormInputs = {
  checkIn: "",
  checkOut: "",
  peopleCount: 0,
};

const StayInfoSelect: React.FC<IStayInfoSelectProps> = ({ first, maxPeople }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [form, setForm] = React.useState<IFormInputs>(initialForm);
  const [valid, setValid] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (form.peopleCount && form.checkOut && form.checkIn) {
      setValid(true);
    }
  }, [form.checkIn, form.checkOut, form.peopleCount]);

  return (
    <>
      <SelectsWrapper>
        <GuestSelect
          placeholder="Guests"
          bordered={false}
          size="small"
          onChange={(peopleCount: number) => {
            localStorage.setItem(LOCAL_STORAGE_PEOPLE, String(peopleCount));
            setForm({ ...form, peopleCount });
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Option key={i + 1} value={i + 1}>
              {i + 1} {i + 1 === maxPeople && " - this room's limit"}
            </Option>
          ))}
        </GuestSelect>
        <StyledRangePicker
          placeholder={[t("input.date.checkIn"), t("input.date.checkOut")]}
          suffixIcon=""
          onChange={(_, [checkIn, checkOut]) => {
            localStorage.setItem(LOCAL_STORAGE_CHECK_IN, checkIn);
            localStorage.setItem(LOCAL_STORAGE_CHECK_OUT, checkOut);
            setForm({ ...form, checkOut, checkIn });
          }}
        />
      </SelectsWrapper>
      <Button
        onClick={() =>
          router.push(
            `/search?people=${form.peopleCount}&checkIn=${form.checkIn}&checkOut=${form.checkOut}${
              first ? `&first=${first}` : ""
            }`
          )
        }
        disabled={!valid}
      >
        {t("pages.home.buttons.search")}
      </Button>
    </>
  );
};

export default StayInfoSelect;
