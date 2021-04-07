import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { Popover } from "antd";

import LanguageIcon from "../../../assets/icons/LanguageIcon";
import Margin from "../../atoms/Margin";

const LANGUAGES = [
  {
    code: "fr",
    label: "Français",
  },
  {
    code: "en",
    label: "English",
  },
];

type ITranslationProps = {};

const Translation: React.FC<ITranslationProps> = ({ ...props }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  console.log("router", router);

  const [visible, setVisible] = React.useState<boolean>(false);
  const handleVisibleChange = (visible: boolean) => setVisible(visible);

  const content = (
    <>
      {LANGUAGES.map((language) => (
        <li>
          <Margin>
            <Link href={router.pathname} locale={language.code}>
              {language.label}
            </Link>
          </Margin>
        </li>
      ))}
    </>
  );
  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <div>
        <LanguageIcon />
      </div>
    </Popover>
  );
};

export default Translation;
