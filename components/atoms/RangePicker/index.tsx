import styled from "styled-components";
import { DatePicker } from "antd";

import { inputStyles } from "../Input";

const { RangePicker } = DatePicker;

export const StyledRangePicker = styled(RangePicker)`
  ${inputStyles}
`;
