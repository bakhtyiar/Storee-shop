import React from 'react';
import {Alert, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {Field} from "formik";
import {shipmentMethods, states, warehouses} from "../../../utils/constants";
import dayjs from "dayjs";

const ShipmentForm = ({values, touched, errors, authUserState, handleChange, handleBlur}) => {
    return (
        <Card body>
            <ListGroup variant="flush">
                <ListGroup.Item className=''>
                    <h5>Shipment</h5>
                    <Form.Group className='mb-3'>
                        <h6>Way to ship</h6>
                        <Form.Check
                            as={Field}
                            inline
                            label={shipmentMethods.warehouse.label}
                            name="shipmentMethod"
                            value={shipmentMethods.warehouse.value}
                            type='radio'
                            id='shipmentMethod-1'
                        />
                        <Form.Check
                            as={Field}
                            inline
                            label={shipmentMethods.courier.label}
                            name="shipmentMethod"
                            value={shipmentMethods.courier.value}
                            type='radio'
                            id='shipmentMethod-2'
                        />
                        <Form.Check
                            as={Field}
                            inline
                            label={shipmentMethods.postOffice.label}
                            name="shipmentMethod"
                            value={shipmentMethods.postOffice.value}
                            type='radio'
                            id='shipmentMethod-3'
                        />
                        <Form.Check
                            as={Field}
                            inline
                            disabled
                            name="shipmentMethod"
                            label={shipmentMethods.airDrone.label}
                            value={shipmentMethods.airDrone.value}
                            type='radio'
                            id='shipmentMethod-4'
                        />
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className=''>
                    {values.shipmentMethod === shipmentMethods.warehouse.value &&
                        <>
                            <Form.Group className='mb-3'>
                                <h6>Warehouse address</h6>
                                {
                                    warehouses.map((warehouse, index) => (
                                        <Form.Check
                                            as={Field}
                                            inline
                                            name="address"
                                            label={warehouse.address}
                                            value={warehouse.address}
                                            type='radio'
                                            id={`warehouse-${index}`}
                                            key={`warehouse-${index}`}
                                        />
                                    ))
                                }
                            </Form.Group>
                        </>}
                    {values.shipmentMethod === shipmentMethods.postOffice.value &&
                        <>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        placeholder="New York"
                                        type="text"
                                        required
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.city && !errors.city}
                                        isInvalid={touched.city && !!errors.city}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select
                                        defaultValue={authUserState.isLoggedIn && authUserState.address.state ? authUserState.address.state : 'Choose...'}
                                    >
                                        <option disabled>Choose...</option>
                                        {states.map((state) => (
                                            <option key={state.value}
                                                    value={state.value}>{state.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        placeholder="10000"
                                        type="text"
                                        required
                                        name="postalCode"
                                        value={values.postalCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.postalCode && !errors.postalCode}
                                        isInvalid={touched.postalCode && !!errors.postalCode}
                                    />
                                </Form.Group>
                            </Row>
                        </>}
                    {values.shipmentMethod === shipmentMethods.courier.value &&
                        <>
                            <Row>
                                <Form.Group as={Col} className="mb-3"
                                            controlId="formGridAddress1">
                                    <Form.Label>House and street</Form.Label>
                                    <Form.Control
                                        placeholder="1234 Main St"
                                        type="text"
                                        required
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.address && !errors.address}
                                        isInvalid={touched.address && !!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {touched.address && errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        placeholder="New York"
                                        type="text"
                                        required
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.city && !errors.city}
                                        isInvalid={touched.city && !!errors.city}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select
                                        defaultValue={authUserState.isLoggedIn && authUserState.address.state ? authUserState.address.state : 'Choose...'}
                                    >
                                        <option disabled>Choose...</option>
                                        {states.map((state) => (
                                            <option key={state.value}
                                                    value={state.value}>{state.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        placeholder="10000"
                                        type="text"
                                        required
                                        name="postalCode"
                                        value={values.postalCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.postalCode && !errors.postalCode}
                                        isInvalid={touched.postalCode && !!errors.postalCode}
                                    />
                                </Form.Group>
                            </Row>
                        </>}
                    {values.shipmentMethod === shipmentMethods.airDrone.value &&
                        <>
                            <Alert key='warning' variant='warning'>
                                Airdrone shipment is not available now
                            </Alert>
                        </>}
                </ListGroup.Item>
                <ListGroup.Item className=''>
                    <Row>
                        <h6>Date</h6>
                            <p>{dayjs().add(Math.round(Math.random() * 6), 'day').format('D MMMM YYYY')}</p>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default ShipmentForm;