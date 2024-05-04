import React, { useContext } from "react";
import { ColorPalletContext } from "../../Technician/Contexts/ColorPalletContext";

const Footer = () => {
  const { colorPallet } = useContext(ColorPalletContext);

  return (
    <div >
      <p
        style={{
          minHeight: "4vh",
          textAlign: "center",
          color: colorPallet.fourthcolor,
          fontSize: '.9rem'
        }}
      >
        Copyright &copy; sknefi
      </p>
    </div>
  );
};

export default Footer;
