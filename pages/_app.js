import { createGlobalStyle, ThemeProvider } from "styled-components";
import { appWithTranslation } from "next-i18next";

const GlobalStyle = createGlobalStyle`
body {
  font-family: "Nunito", sans-serif;
  background-color: #FAFAFB;
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
