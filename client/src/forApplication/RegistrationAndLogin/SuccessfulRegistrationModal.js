import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function SuccessfulRegistrationModal(props) {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Úspešne vytvorený účet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.name}, vítaj na našej stránke.</p>
        <p>Za pár sekúnd budete presmerovaný na prihlasovaciu stránku</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Zatvoriť
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SuccessfulRegistrationModal
