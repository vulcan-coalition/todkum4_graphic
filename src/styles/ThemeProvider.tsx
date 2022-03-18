import React from "react";
import { ThemeProvider, createMuiTheme, getContrastRatio } from "@material-ui/core/styles";

const AppStyleProvider: React.FC = ({ children }) => {
  const theme = createMuiTheme({
    palette: {
      // dark theme
      primary: {
        light: "#F0F0F0",
        main: "#212121",
        dark: "#868787",
        contrastText: "#F0F0F0",
      },
      // light theme
      secondary: {
        light: "#727373",
        main: "#F0F0F0",
        dark: "#212121",
        contrastText: "#212121",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    typography: {
      fontFamily: [
        "THSarabun",
      ].join(","),
      h2: {
        fontFamily: "THSarabun !important",
        "@media (min-width:600px)": {
          fontSize: "calc(32px + var(--upfont-header2)) !important",
        },
      },
      h3: {
        fontFamily: "THSarabun !important",
        "@media (min-width:600px)": {
          fontSize: "calc(18px + var(--upfont-header3)) !important",
        },
      },
      body1: {
        fontFamily: "THSarabun !important",
        "@media (min-width:600px)": {
          fontSize: "calc(22px + var(--up-body)) !important",
        },
      },
      body2: {
        fontFamily: "THSarabun !important",
        "@media (min-width:600px)": {
          fontSize: "calc(18px + var(--up-body)) !important",
        },
      },
      subtitle2: {
        fontFamily: "THSarabun !important",
        "@media (min-width:600px)": {
          fontSize: "calc(14px + var(--up-body)) !important",
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppStyleProvider;
