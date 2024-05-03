import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { ColorPalletContext } from "../../Technician/Contexts/ColorPalletContext";

const LogoutModal = ({ show, handleClose, handleLogout }) => {
  const { colorPallet } = useContext(ColorPalletContext);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: colorPallet.secondarycolor,
          border: `2px solid ${colorPallet.fourthcolor}`,
          borderBottom: '0',
        }}
      >
        <Modal.Title style={{ color: colorPallet.fourthcolor }}>
          Potvrďte odhlásenie
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          color: colorPallet.fourthcolor,
          backgroundColor: colorPallet.secondarycolor,
          border: `2px solid ${colorPallet.fourthcolor}`,
        }}
      >
        Chcete sa naozaj odhlásiť?
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: colorPallet.secondarycolor,
          border: `2px solid ${colorPallet.fourthcolor}`,
          borderTop: 0

        }}
      >
        <Button
          variant="secondary"
          onClick={handleClose}
          style={{
            background: colorPallet.sixthcolor,
            border: `2px solid ${colorPallet.fourthcolor}`,
          }}
        >
          <p style={{ color: colorPallet.secondarycolor }}>Zrušiť</p>
        </Button>
        <Button
          variant="danger"
          onClick={handleLogout}
          style={{
            border: `2px solid ${colorPallet.fourthcolor}`,
          }}
        >
          <p style={{ color: colorPallet.secondarycolor }}>Logout</p>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
