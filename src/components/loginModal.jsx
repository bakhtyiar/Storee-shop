import React, {useContext} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {RootContext} from "../contexts/root-context";

const LoginModal = () => {
    const {authModalState: { onSwitchType }} = useContext(RootContext);

    return (
        <Form>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer style={{'display': 'flex', 'justifyContent': 'space-between'}}>
                <Button as={Link} onClick={onSwitchType}>Doesn't have an account?</Button>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Modal.Footer>
        </Form>
    );
};

export default LoginModal;

