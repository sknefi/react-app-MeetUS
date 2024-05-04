import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddEvent from './AddEvent';

import { ColorPalletContext } from '../../Technician/Contexts/ColorPalletContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const { colorPallet } = useContext(ColorPalletContext)
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='add-event-btn' style={{ marginLeft: 'auto' }}>
            <Button onClick={handleOpen} style={ { color: colorPallet.fourthcolor, backgroundColor: colorPallet.maincolor}}>Vytvoriť event</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddEvent onClose={handleClose} />
                </Box>
            </Modal>
        </div>
    );
}
