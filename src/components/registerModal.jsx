import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {routes} from "../utils/constants";

const registerModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Register
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"/>
                        <Form.Text className="text-muted">
                            We'll never share your confidential data.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your confidential data.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer style={{'display': 'flex', 'justify-content': 'space-between'}}>
                    <Link to={routes.home.path}>Already have an account?</Link>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default registerModal;

