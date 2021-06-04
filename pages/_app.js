import { createGlobalStyle, ThemeProvider } from "styled-components";
import { appWithTranslation } from "next-i18next";
import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
body {
  font-family: "Nunito", sans-serif;
  background-color: #FAFAFB;
}
.ant-drawer-title {
  color: transparent
}
@media(max-width: 576px) { 
  .ant-picker-panels { 
    flex-direction: column;
  } 
}
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(App);
