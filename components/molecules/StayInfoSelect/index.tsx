import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Col, Form, Row, Select } from "antd";
import moment from "moment";

import Button from "../../atoms/Button";
import { StyledRangePicker } from "../../atoms/RangePicker";
import {
  LOCAL_STORAGE_CHECK_IN,
  LOCAL_STORAGE_CHECK_OUT,
  LOCAL_STORAGE_PEOPLE,
  LOCAL_STORAGE_SEARCH,
} from "../../../constants";
import { StyledSelect } from "../../atoms/Select";

const { Option } = Select;

type IStayInfoSelectProps = {
  first?: string;
  maxPeople?: number;
};

type IFormInputs = {
  dates: [any, any];
  people: number;
};

const StayInfoSelect: React.FC<IStayInfoSelectProps> = ({ first, maxPeople }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [form] = Form.useForm<IFormInputs>();

  const handleSubmit = (form: IFormInputs) => {
    const { dates, people } = form;
    const checkIn = dates[0]._d.toISOString().substring(0, 10);
    const checkOut = dates[1]._d.toISOString().substring(0, 10);
    localStorage.setItem(LOCAL_STORAGE_CHECK_IN, checkIn);
    localStorage.setItem(LOCAL_STORAGE_CHECK_OUT, checkOut);
    localStorage.setItem(LOCAL_STORAGE_PEOPLE, String(people));
    const searchQuery = `/search?people=${people}&checkIn=${checkIn}&checkOut=${checkOut}${
      first ? `&first=${first}` : ""
    }`;
    localStorage.setItem(LOCAL_STORAGE_SEARCH, searchQuery);
    router.push(searchQuery);
  };

  React.useEffect(() => {
    const checkIn = localStorage.getItem(LOCAL_STORAGE_CHECK_IN);
    const checkOut = localStorage.getItem(LOCAL_STORAGE_CHECK_OUT);
    const people = localStorage.getItem(LOCAL_STORAGE_PEOPLE);
    if (checkIn && checkOut && people) {
      form.setFieldsValue({
        dates: [moment(checkIn), moment(checkOut)],
        people: Number(people),
      });
    }
  }, []);

  return (
    <Form form={form} name="stayInfoSelect" layout="horizontal" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            name="people"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <StyledSelect placeholder="Guests" bordered={false} size="small">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Option key={i} value={i}>
                  {i} {i === maxPeople && " - this room's limit"}
                </Option>
              ))}
            </StyledSelect>
          </Form.Item>
        </Col>
        <Col xs={24} sm={16}>
          <Form.Item
            name="dates"
            rules={[
              {
                type: "array",
                required: true,
                message: "",
              },
            ]}
          >
            <StyledRangePicker placeholder={[t("input.date.checkIn"), t("input.date.checkOut")]} />
          </Form.Item>
        </Col>
      </Row>
      <Button type="submit">{t("pages.home.buttons.search")}</Button>
    </Form>
  );
};

export default StayInfoSelect;
