import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const CreateNoteModal = ({ handleClose, modalopen, content, CreateNote, title, setvalueonChange }) => {
    console.log(modalopen, 'Modal')
    return (
        <div>
            <Modal show={modalopen} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Create Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Note Title</Form.Label>
                            <Form.Control type="text"
                                placeholder="Note title..."
                                value={title}
                                onChange={setvalueonChange} />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea"
                                rows="3"
                                value={content}
                                placeholder="content..."
                                onChange={setvalueonChange} />
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={CreateNote}>
                        Submit
          </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

