import React, { useState } from "react";
import { useRouter } from "next/router";
import { Modal, Button, Row, Col } from "antd";
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

const SocialShare: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const url = process.env.VERCEL_URL + router.route;
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
      >
        <H5>Social Media</H5>
        <Row justify="space-between">
          <Col span={8}>
            <FacebookShareButton url={url}>
              <FacebookIcon size={50} round={true} />
            </FacebookShareButton>
          </Col>
          <Col span={8}>
            <TwitterShareButton url={url}>
              <TwitterIcon size={50} round={true} />
            </TwitterShareButton>
          </Col>
          <Col span={8}>
            <VKShareButton url={url}>
              <VKIcon size={50} round={true} />
            </VKShareButton>
          </Col>
        </Row>

        <H5>Messaging & Email</H5>
        <Row>
          <Col span={6}>
            <WhatsappShareButton url={url}>
              <WhatsappIcon size={50} round={true} />
            </WhatsappShareButton>
          </Col>
          <Col span={6}>
            <TelegramShareButton url={url}>
              <TelegramIcon size={50} round={true} />
            </TelegramShareButton>
          </Col>
          <Col span={6}>
            <ViberShareButton url={url}>
              <ViberIcon size={50} round={true} />
            </ViberShareButton>
          </Col>
          <Col span={6}>
            <EmailShareButton url={url}>
              <EmailIcon size={50} round={true} />
            </EmailShareButton>
          </Col>
        </Row>

        <H5>Copy link</H5>
      </Modal>
    </>
  );
};

export default SocialShare;
