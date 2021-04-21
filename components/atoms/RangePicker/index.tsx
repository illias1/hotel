import styled from "styled-components";
import { DatePicker } from "antd";

import { inputStyles } from "../Input";

const { RangePicker } = DatePicker;

export const StyledRangePicker = styled(RangePicker)`
  ${inputStyles}
  /* TODO: not working but correct strategy */
  @media(max-width: 576px) {
    .ant-picker-panels {
      flex-direction: column;
    }
  }
`;
