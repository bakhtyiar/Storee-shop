import React from 'react';
import {Card, Col, Form} from "react-bootstrap";

const IdentityForm = ({values, touched, errors, handleChange, handleBlur}) => {
    return (
        <Card body>
            <h5>Identity data</h5>
            <Form.Group as={Col} className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.username && !errors.username}
                    isInvalid={touched.username && !!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                    {touched.username && errors.username}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {touched.email && errors.email}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    We'll never share your confidential data
                </Form.Text>
            </Form.Group>
        </Card>
    );
};

export default IdentityForm;