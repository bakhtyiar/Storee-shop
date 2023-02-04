import React, {useContext} from 'react';
import {Accordion, Alert, Button, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import {RootContext} from "../contexts/root-context/root-context";
import {paymentMethods, shipmentMethods} from "../utils/constants";
import {Field, Formik} from "formik";
import * as yup from "yup";
import FormTextField from "../utils/formik/FormTextField";
import dayjs from "dayjs";
import WarehouseAddressesFormSection from "../components/OrderForm/ShipmentFormParts/WarehouseAddressesFormSection";
import PostOfficeFormSection from "../components/OrderForm/ShipmentFormParts/PostOfficeFormSection";
import CourierFormSection from "../components/OrderForm/ShipmentFormParts/CourierFormSection";
import OrderProductCard from "../components/OrderProductCard/OrderProductCard";

// todo : fix 1.when logged in on page refresh auto fill data to input does not working

const schema = yup.object().shape({
    username: yup.string()
        .required('Required')
        .min(6, 'Username is too short. Required minimum 6 symbols')
        .max(50, 'Username is too long. Required maximum 50 symbols'),
    email: yup.string()
        .required('Required')
        .email('Seems like wrong format of email'),
    shipmentMethod: yup.string().required('Required'),
    address: yup.string()
        .required('Required')
        .min(6, 'Address is too short. Required minimum 6 symbols'),
    city: yup.string()
        .when('shipmentMethod', {
            is: (value) => ([shipmentMethods.courier.value, shipmentMethods.airDrone.value, shipmentMethods.postOffice.value].includes(value)),
            then: yup.string().required('Required').min(3, 'City\'s name is too short. Required minimum 3 symbols'),
        }),
    state: yup.string()
        .when('shipmentMethod', {
            is: (value) => ([shipmentMethods.courier.value, shipmentMethods.airDrone.value, shipmentMethods.postOffice.value].includes(value)),
            then: yup.string().required('Required').min(2, 'State\'s name is too short. Required minimum 2 symbols'),
        }),
    postalCode: yup.string()
        .when('shipmentMethod', {
            is: (value) => ([shipmentMethods.courier.value, shipmentMethods.airDrone.value, shipmentMethods.postOffice.value].includes(value)),
            then: yup.string().required('Required').length(5, 'Postalcode is required to be 6 symbols'),
        }),
    paymentMethod: yup.string().required('Required'),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

const Order = () => {
    const {
        authUserState,
        cartState: {products, total, discountedTotal, totalProducts, totalQuantity}
    } = useContext(RootContext);

    console.log('authUserState', authUserState);

    const handleSubmit = async (event) => {
        console.log('Order form submitted content', event);
    };

    return (
        <Container className='mt-4'>
            <Formik
                validationSchema={schema}
                validateOnBlur
                onSubmit={handleSubmit}
                initialValues={{
                    username: authUserState.isLoggedIn ? authUserState.username : '',
                    email: authUserState.isLoggedIn ? authUserState.email : '',
                    shipmentMethod: shipmentMethods.courier.value,
                    address: authUserState.isLoggedIn ? authUserState.address.address : '',
                    city: authUserState.isLoggedIn ? authUserState.address.city : '',
                    state: authUserState.isLoggedIn ? authUserState.address.state : '',
                    postalCode: authUserState.isLoggedIn ? authUserState.address.postalCode : '',
                    paymentMethod: paymentMethods.card.value,
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
                        <h3 className='mb-3'>Order</h3>
                        <Row>
                            <Col xs={12} md={8} className='d-flex flex-column gap-2'>
                                <Card body>
                                    <h5>Identity data</h5>
                                    <div className={'mb-3'}>
                                        <FormTextField
                                            as={Col}
                                            controlId="formBasicUsername"
                                            label='Username'
                                            placeholder='Enter your name'
                                            name='username'
                                            type='text'
                                        />
                                    </div>
                                    <div className={'mb-3'}>
                                        <FormTextField
                                            as={Col}
                                            controlId="formBasicEmail"
                                            label='Email'
                                            placeholder='Enter email'
                                            name='email'
                                            type='email'
                                            formBottomText="We'll never share your confidential data"
                                        />
                                    </div>
                                </Card>
                                <Card body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h5>Shipment</h5>
                                            <Form.Group className='mb-3'>
                                                <h6>Way to ship</h6>
                                                {Object.values(shipmentMethods).map((method, index) => (
                                                    <Form.Check
                                                        as={Field}
                                                        inline
                                                        label={method.label}
                                                        name="shipmentMethod"
                                                        value={method.value}
                                                        type='radio'
                                                        id={`shipmentMethod-${index}`}
                                                        key={`shipmentMethod-${index}`}
                                                        disabled={method.value === 'airDrone'}
                                                    />
                                                ))}
                                            </Form.Group>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {values.shipmentMethod === shipmentMethods.warehouse.value &&
                                                <div className={'mb-3'}>
                                                    <WarehouseAddressesFormSection/>
                                                </div>
                                            }
                                            {values.shipmentMethod === shipmentMethods.postOffice.value &&
                                                <div className={'mb-3'}>
                                                    <PostOfficeFormSection/>
                                                </div>
                                            }
                                            {values.shipmentMethod === shipmentMethods.courier.value &&
                                                <div className={'mb-3'}>
                                                    <CourierFormSection/>
                                                </div>
                                            }
                                            {values.shipmentMethod === shipmentMethods.airDrone.value &&
                                                <Alert key='warning' variant='warning'>
                                                    Airdrone shipment is not available now
                                                </Alert>
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h6>Date</h6>
                                            <p>Your package will
                                                arrive {dayjs().add(7, 'day').format('D MMMM YYYY')}</p>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card body>
                                    <h5>Payment</h5>
                                    <Form.Group className='mb-3'>
                                        <h6>Way to pay</h6>
                                        {Object.values(paymentMethods).map((method, index) => (
                                            <Form.Check
                                                as={Field}
                                                inline
                                                label={method.label}
                                                name="paymentMethod"
                                                value={method.value}
                                                type='radio'
                                                id={`paymentMethod-${index}`}
                                                key={`paymentMethod-${index}`}
                                            />
                                        ))}
                                    </Form.Group>
                                </Card>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><h5>Order products</h5></Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                {
                                                    products.map((product, index) => (
                                                        <ListGroup.Item key={product.id} className='px-3'>
                                                            <OrderProductCard product={product} selfIndexInCart={index}
                                                                              key={product.id}/>
                                                        </ListGroup.Item>
                                                    ))
                                                }
                                                <ListGroup.Item className='px-3 d-flex justify-content-end'>
                                                    <h6 className='mt-3'>Amount: {totalProducts} Quantity: {totalQuantity}</h6>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Card body>
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
                                </Card>
                            </Col>
                            <Col xs={12} md={4}>
                                <Card body>
                                    <h3>Order</h3>
                                    <p className='d-flex justify-content-between'>
                                        <span>Cost: </span> <span>${total}</span>
                                    </p>
                                    <p className='d-flex justify-content-between'>
                                        <span>Discount: </span> <span>${total - discountedTotal}</span>
                                    </p>
                                    <p className='d-flex justify-content-between'>
                                        <span>Total: </span> <b><span className='d-inline'>${discountedTotal}</span></b>
                                    </p>
                                    <Button variant="primary" type="submit" className='w-100'>
                                        Confirm order
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Order;