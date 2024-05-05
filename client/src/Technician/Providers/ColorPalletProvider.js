import { ColorPalletContext } from "../Contexts/ColorPalletContext";
import { useState } from "react";

const ColorPalletProvider = ({ children }) => {
  const lightMode = {
    mode: 'light',
    colorPallet: {
      maincolor: "#88A8D4",         // slabo modra
      secondarycolor: "#FEFFFE",    // biela
      thirdcolor: "#FF686B",        // ruzova
      fourthcolor: "#010001",       // cierna
      fifthcolor: "#102660",        // royal blue
      sixthcolor: "#424242",        // siva
    }

  };

  const darkMode = {
    mode: 'dark',
    colorPallet: {
      maincolor: "#88A8D4",         // slabo modra
      secondarycolor: "#010001",    // cierna
      thirdcolor: "#FF686B",        // ruzova
      fourthcolor: "#FEFFFE",       // biela
      fifthcolor: "#102660",        // royal blue
      sixthcolor: "#424242",        // siva
    }
  };

  const [colorMode, setColorMode] = useState(lightMode)
  
  function setThemeMode() {
    setColorMode(prevMode => prevMode.mode === 'dark' ? lightMode : darkMode);
  }


  return (
    <ColorPalletContext.Provider value={{ ...colorMode, changeColorTheme: setThemeMode }}>
      {children}
    </ColorPalletContext.Provider>
  )
};

export default ColorPalletProvider;
