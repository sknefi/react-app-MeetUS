import { useEffect, useState } from "react";
import { ColorPalletContext } from "../Contexts/ColorPalletContext";

const ColorPalletProvider = ({ children }) => {
  const value = {
    colorPallet: {
      maincolor: "#88A8D4",         // slabo modra
      secondarycolor: "#FEFFFE",    // biela
      thirdcolor: "#FF686B",        // ruzova
      fourthcolor: "#010001",       // cierna
      fifthcolor: "#102660",        // royal blue
      sixthcolor: "#424242",        // siva
    },
  };

  const value1 = {
    colorPallet: {
      maincolor: "#88A8D4",         // slabo modra
      secondarycolor: "#010001",    // cierna
      thirdcolor: "#FF686B",        // ruzova
      fourthcolor: "#FEFFFE",       // biela
      fifthcolor: "#102660",        // royal blue
      sixthcolor: "#424242",        // siva
    },
  };

  return (
    <ColorPalletContext.Provider value={value}>
      {children}
    </ColorPalletContext.Provider>
  );
};

export default ColorPalletProvider;
