import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Select } from "antd";

import Button from "../../atoms/Button";
import { StyledRangePicker } from "../../atoms/RangePicker";
import { StyledSelect } from "../../atoms/Select";

const { Option } = Select;

type IStayInfoSelectProps = {
  first?: string;
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

const StayInfoSelect: React.FC<IStayInfoSelectProps> = ({ first }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form, setForm] = React.useState<IFormInputs>(initialForm);
  const [valid, setValid] = React.useState<boolean>(false);
  const handleChange = (value) => {};
  React.useEffect(() => {
    if (form.peopleCount && form.checkOut && form.checkIn) {
      setValid(true);
    }
  }, [form.checkIn, form.checkOut, form.peopleCount]);

  return (
    <>
      <StyledSelect
        placeholder="N of people"
        bordered={false}
        size="small"
        onChange={(peopleCount: number) => setForm({ ...form, peopleCount })}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <Option key={i + 1} value={i + 1}>
            {i + 1}
          </Option>
        ))}
      </StyledSelect>
      <StyledRangePicker
        placeholder={t("input.date.placeholder")}
        suffixIcon=""
        onChange={(_, [checkIn, checkOut]) => setForm({ ...form, checkOut, checkIn })}
      />
      <Button
        disabled={!valid}
        onClick={() => {
          router.push(
            `/search?people=${form.peopleCount}&checkIn=${form.checkIn}&checkOut=${form.checkOut}${
              first ? `&first=${first}` : ""
            }`
          );
        }}
      >
        <a>{t("pages.home.buttons.search")}</a>
      </Button>
    </>
  );
};

export default StayInfoSelect;
