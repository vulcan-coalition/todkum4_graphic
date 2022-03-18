import React, { useEffect } from "react";
import UserProvider from "./contexts/user";
import ThemeContextProvider from "./contexts/theme";
import { setFontsize } from "./plugins/Fontsize";
import { setFontScale, setBtnScale } from "./plugins/setScaleElement";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "./themes/theme";
import Routes from "./routes/Routes";

function App() {

   const setting = ['token', 'refresh', 'viewMode', 'speedVoiceOver', 'autoSpeaking', 'volumeVoiceOver', 'fontSizeMode', 'btnScale', 'fontScale', 'StartDateGetCoin', 'type', 'theme']
  const params = new URLSearchParams(window.location.search);
  setting.forEach(param => {
    const value = params.get(param)
    if (value) {
      localStorage.setItem(param, value)
    }
  });

  useEffect(() => {
    const fontSizeMode = localStorage.getItem("fontSizeMode");
    const fontScale = localStorage.getItem("fontScale");
    const btnScale = localStorage.getItem("btnScale");
    if (fontSizeMode && fontScale && btnScale) {
      setFontsize(fontSizeMode);
      setFontScale(fontScale);
      setBtnScale(btnScale);
    }
  }, []);


  return (
    <ThemeContextProvider>
      <ThemeProvider>
        <CssBaseline />
        <UserProvider>
          <Routes />
        </UserProvider>
      </ThemeProvider>
    </ThemeContextProvider>
  );
}

export default App;
