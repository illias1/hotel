const { i18n } = require("./next-i18next.config");

module.exports = {
  images: {
    domains: ["via.placeholder.com", "ik.imagekit.io"],
  },
  future: {
    webpack5: true,
  },
  i18n,
};
