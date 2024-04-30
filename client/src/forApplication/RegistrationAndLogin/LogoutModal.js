import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const LogoutModal = ({ show, handleClose, handleLogout }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Potvrďte odhlásenie</Modal.Title>
            </Modal.Header>
            <Modal.Body>Chcete sa naozaj odhlásiť?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Zrušiť
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LogoutModal
