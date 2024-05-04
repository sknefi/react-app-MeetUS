import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddGroup from "./AddGroup";
import { useNavigate } from "react-router-dom";

import { LoggedUserContext } from "../../Technician/Contexts/LoggedUserContext";
import { ColorPalletContext } from "../../Technician/Contexts/ColorPalletContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalCreateNewGroup() {
  const { colorPallet } = useContext(ColorPalletContext);
  const { loggedUser } = useContext(LoggedUserContext);

  const navigate = useNavigate();

  const isUserLogged = () => {
    return Object.keys(loggedUser).length !== 0;
  };
  const redirectToLogin = () => {
    navigate("/login");
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    // ak neexistuje user, alebo jeho ID sa nenachádza v databáze, skupina sa nevytvorí
    <div className="add-event-btn" style={{ margin: "0 auto" }}>
      <Button
        onClick={isUserLogged() ? handleOpen : redirectToLogin}
        style={{
          backgroundColor: colorPallet.maincolor,
          color: colorPallet.fourthcolor,
          margin: "3vh",
          fontSize: "1.5rem",
          borderRadius: '10px',
          border: `2px solid ${colorPallet.fourthcolor}`
        }}
      >
        Vytvoriť skupinu
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            backgroundColor: colorPallet.secondarycolor,
            border: `.5px solid ${colorPallet.fourthcolor}`,
            borderRadius: "20px",
          }}
        >
          <AddGroup handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
