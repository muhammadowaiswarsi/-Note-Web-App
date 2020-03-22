import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const ConfirmationModal = ({ handleClose, deleteModal, deleteNote }) => {
    return (
        <div>
            <Modal size="sm" show={deleteModal} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Are you sure you'd like to delete this note?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
          </Button>
                    <Button variant="primary" onClick={deleteNote}>
                        Yes
          </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

