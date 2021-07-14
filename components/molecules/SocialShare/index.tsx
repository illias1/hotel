import React, { useState } from "react";
import { useRouter } from "next/router";
import { Modal, Button, Row, Col, Input, notification } from "antd";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
} from "react-share";

import ShareIcon from "../../../assets/icons/ShareIcon";
import { H5 } from "../../atoms/Typography";
import { Flex } from "../../atoms/Section";

const socialMediaIcons = (url: string, style: React.CSSProperties) => [
  {
    name: "Facebook",
    icon: (
      <FacebookShareButton style={style} url={url}>
        <FacebookIcon size={40} />
      </FacebookShareButton>
    ),
  },
  {
    name: "VK",
    icon: (
      <VKShareButton style={style} url={url}>
        <VKIcon size={40} />
      </VKShareButton>
    ),
  },
  {
    name: "Twitter",
    icon: (
      <TwitterShareButton style={style} url={url}>
        <TwitterIcon size={40} />
      </TwitterShareButton>
    ),
  },
  { name: "", icon: "" },
];

const messagingIcons = (url: string, style: React.CSSProperties) => [
  {
    name: "WhatsApp",
    icon: (
      <WhatsappShareButton style={style} url={url}>
        <WhatsappIcon size={40} />
      </WhatsappShareButton>
    ),
  },
  {
    name: "Telegram",
    icon: (
      <TelegramShareButton style={style} url={url}>
        <TelegramIcon size={40} />
      </TelegramShareButton>
    ),
  },
  {
    name: "Viber",
    icon: (
      <ViberShareButton style={style} url={url}>
        <ViberIcon size={40} />
      </ViberShareButton>
    ),
  },
  {
    name: "Email",
    icon: (
      <EmailShareButton style={style} url={url}>
        <EmailIcon size={40} />
      </EmailShareButton>
    ),
  },
];

const SocialShare: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [url, setUrl] = React.useState<string>("");
  const router = useRouter();
  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyToClipBoard = () => {
    if (typeof window !== "undefined" && "navigator" in window && "clipboard" in window.navigator) {
      navigator.clipboard.writeText(url);
      console.log("before");
      notification.success({
        message: `Copied to clipboard`,
        description: "",
        placement: "bottomLeft",
        duration: 1,
      });
      console.log("after");
    } else {
      notification.error({
        message: `Error copying to clipboard`,
        description: "",
        placement: "bottomLeft",
        duration: 2,
      });
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  console.log("route", url);
  return (
    <>
      <ShareIcon handleClick={showModal} />
      <Modal
        style={{ borderRadius: 30 }}
        title="Share this place with friends and family"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <H5>Social Media</H5>
        <Row style={{ marginBottom: 20 }}>
          {socialMediaIcons(url, { marginRight: 20 }).map((icon) => (
            <Col key={icon.name} span={12}>
              <Flex justify="start" align="center">
                {icon.icon}
                {icon.name}
              </Flex>
            </Col>
          ))}
        </Row>

        <H5>Messaging & Email</H5>
        <Row style={{ marginBottom: 20 }}>
          {messagingIcons(url, { marginRight: 20 }).map((icon) => (
            <Col key={icon.name}  span={12}>
              <Flex justify="start" align="center">
                {icon.icon}
                {icon.name}
              </Flex>
            </Col>
          ))}
        </Row>

        <H5>Copy link</H5>
        <Flex>
          <Input value={url} disabled size="large" />
          <Button onClick={copyToClipBoard} size="large">
            Copy
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default SocialShare;
