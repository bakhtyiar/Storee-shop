import React, {useContext} from 'react';
import dayjs from "dayjs";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {RootContext} from "../contexts/root-context/root-context";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../utils/server-api/user/user";
import {routes} from "../utils/constants";
import {Formik} from "formik";
import * as yup from "yup";

// todo : fix 1.when logged in on page refresh auto fill data to input does not working

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

const Order = () => {
    const {authUserState} = useContext(RootContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const {username, email, password} = event;
        const res = await registerUser(username, email, password);
        authUserState.onLogin(res);
        navigate(`${routes.user.path}/${res.id}`);
    };

    return (
        <Container>
            <Formik
                validationSchema={schema}
                validateOnBlur
                onSubmit={handleSubmit}
                initialValues={{
                    username: authUserState.isLoggedIn ? authUserState.username : '',
                    email: authUserState.isLoggedIn ? authUserState.email : '',
                    firstName: authUserState.isLoggedIn ? authUserState.firstName : '',
                    lastName: authUserState.isLoggedIn ? authUserState.lastName : '',
                    shipmentMethod: 'warehouse',
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
                        <h3>
                            Order
                        </h3>
                        <Row>
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
                                    disabled={authUserState.isLoggedIn}
                                    readOnly={authUserState.isLoggedIn}
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
                                    disabled={authUserState.isLoggedIn}
                                    readOnly={authUserState.isLoggedIn}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {touched.email && errors.email}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    We'll never share your confidential data
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <h5>Shipment method</h5>
                                <Form.Check
                                    inline
                                    label="Pick up from warehouse"
                                    name="group1"
                                    value='warehouse'
                                    type='radio'
                                    id={`inline-radio-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Courier delivery"
                                    name="group1"
                                    value='courier'
                                    type='radio'
                                    id={`inline-radio-2`}
                                />
                                <Form.Check
                                    inline
                                    label="Delivery to the post office"
                                    name="group1"
                                    value='postOffice'
                                    type='radio'
                                    id={`inline-radio-3`}
                                />
                                <Form.Check
                                    inline
                                    disabled
                                    label="Air drone shipment"
                                    value='airDrone'
                                    type='radio'
                                    id={`inline-radio-4`}
                                />
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Street & house</Form.Label>
                                    <Form.Control placeholder="1234 Main St"/>
                                    <Form.Control.Feedback type="invalid">
                                        {touched.password && errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Apartment</Form.Label>
                                    <Form.Control placeholder="Apartment, studio, or floor"/>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control/>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" id="formGridCheckbox">
                                <Form.Check type="checkbox" label="Check me out"/>
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
                        </Row>
                        <Row>
                            <h5>Shipment</h5>
                            <p>Date: {dayjs().add(3, 'day').format('D MMMM YYYY')}</p>
                        </Row>
                        <div className='d-flex justify-content-between'>
                            <Button variant="primary" type="submit">
                                Make order
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Order;