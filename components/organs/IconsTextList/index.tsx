import { Col, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { TFunction } from "next-i18next";
import React from "react";
import { Space } from "../../atoms/Layout";
import { Flex } from "../../atoms/Section";

type IIconTextListProps = {
  t: TFunction;
  list: {
    icon: JSX.Element;
    name: string;
  }[];
};

const IconTextList: React.FC<IIconTextListProps> = ({ list, t }) => {
  const screens = useBreakpoint();
  return (
    <Row>
      {list.map(({ icon, name }) =>
        screens.md ? (
          <Col xs={24} md={12} key={name}>
            <Space margin="0 0 16px 0">
              <Flex align="center" justify="start">
                <Space margin="0 16px 0 0">{icon}</Space>
                {t(name)}
              </Flex>
            </Space>
          </Col>
        ) : (
          <Flex>
            {t(name)}
            {icon}
          </Flex>
        )
      )}
    </Row>
  );
};

export default IconTextList;
