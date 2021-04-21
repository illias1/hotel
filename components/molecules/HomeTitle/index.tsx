import React from "react";
import { useTranslation } from "next-i18next";

import { H1 } from "../../atoms/Typography";

type IHomeTitleProps = {};

const HomeTitle: React.FC<IHomeTitleProps> = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <div>
      <H1>{t("pages.home.title")}</H1>
    </div>
  );
};

export default HomeTitle;
