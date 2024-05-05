import React, { useContext, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { ColorPalletContext } from "../../Technician/Contexts/ColorPalletContext";

function DarkModeButton() {
  const { colorPallet, changeColorTheme } = useContext(ColorPalletContext);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    changeColorTheme();
  };

  return (
    <>
      <button className="dark-mode-button" onClick={toggleDarkMode}>
        {darkMode ? <IoSunnyOutline style={{ fontSize: '24px' }} /> : <FaMoon style={{ fontSize: '24px' }} /> }
      </button>

      <style>{`
        .dark-mode-button {
          padding: 12px;
          background-color: ${colorPallet.secondarycolor};
          color: ${colorPallet.fourthcolor};
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.4s, color 0.4s;
          font-size: 16px;
          outline: none;
        }

        .dark-mode-button:hover {
          background-color: ${colorPallet.fourthcolor};
          color: ${colorPallet.secondarycolor};
        }
      `}</style>
    </>
  );
}

export default DarkModeButton;
