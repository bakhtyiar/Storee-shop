import React, {useContext} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {RootContext} from "../../contexts/root-context";
import * as yup from 'yup';
import {Formik} from 'formik';
import {registerUser} from "../../utils/methods";
import {routes} from "../../utils/constants";

const schema = yup.object().shape({
    username: yup.string()
        .min(6, 'Username is too short. Required minimum 6 symbols')
        .max(50, 'Username is too long. Required maximum 50 symbols')
        .required('Username is required'),
    email: yup.string()
        .email('Seems like wrong format of email')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password is too short. Write at least 6 symbols')
        .required('Password is required'),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

const RegisterForm = ({isHaveCloseButton = false}) => {
    const {authModalState: {onSwitchType, onHide}, authUserState: {onLogin}} = useContext(RootContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        console.log('event', event);
        const {username, email, password} = event;
        const res = await registerUser(username, email, password);
        console.log('res', res);
        onLogin(res);
        onHide();
        navigate(`${routes.user.path}/${res.id}`);
    };

    return (
        <Formik
            validationSchema={schema}
            validateOnBlur
            onSubmit={handleSubmit}
            initialValues={{
                username: '',
                email: '',
                password: '',
                terms: false,
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Header closeButton={isHaveCloseButton}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Register
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
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

                        <Form.Group className="mb-3" controlId="formBasicEmail">
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

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.password && !errors.password}
                                isInvalid={touched.password && !!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {touched.password && errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Agree to terms and conditions"
                                required
                                feedback={errors.terms}
                                feedbackType="invalid"
                                name="terms"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.terms && !errors.terms}
                                isInvalid={touched.terms && !!errors.terms}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-between'>
                        <Link onClick={onSwitchType}>Already have an account?</Link>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;

