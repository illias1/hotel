import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Select } from "antd";

import Button from "../../atoms/Button";
import { StyledRangePicker } from "../../atoms/RangePicker";
import { StyledSelect } from "../../atoms/Select";

const { Option } = Select;

type IStayInfoSelectProps = {};

type IFormInputs = {
  dateEnter: string;
  dateExit: string;
  peopleCount: number;
};

const initialForm: IFormInputs = {
  dateEnter: "",
  dateExit: "",
  peopleCount: 0,
};

const StayInfoSelect: React.FC<IStayInfoSelectProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const [form, setForm] = React.useState<IFormInputs>(initialForm);
  const handleChange = (value) => {};

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
        onChange={(_, [dateEnter, dateExit]) => setForm({ ...form, dateExit, dateEnter })}
      />
      <Button>{t("pages.home.buttons.search")}</Button>
    </>
  );
};

export default StayInfoSelect;
