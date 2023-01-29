import React from 'react';
import {Alert, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {Field} from "formik";
import {shipmentMethods, states, warehouses} from "../../../utils/constants";
import dayjs from "dayjs";
import FormTextField from "../../../utils/formik/FormTextField";
import FormSelectField from "../../../utils/formik/FormSelectField";

const ShipmentForm = ({values, authUserState}) => {
    return (
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
                <ListGroup.Item className=''>
                    {values.shipmentMethod === shipmentMethods.warehouse.value ?
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
                        </>
                        :
                        values.shipmentMethod === shipmentMethods.postOffice.value ?
                            <>
                                <Row className="mb-3">
                                    <FormTextField
                                        as={Col}
                                        controlId="formGridCity"
                                        label='City'
                                        placeholder='New York'
                                        name='city'
                                        type='text'
                                    />
                                    <FormSelectField
                                        as={Col}
                                        controlId="formGridState"
                                        label='State'
                                        placeholder='New York'
                                        name='state'
                                        type='text'
                                        defaultValue={authUserState.isLoggedIn && authUserState.address.state ? authUserState.address.state : 'Choose...'}
                                    >
                                        <>
                                            <option disabled>Choose...</option>
                                            {states.map((state) => (
                                                <option key={state.value}
                                                        value={state.value}>{state.label}</option>
                                            ))}
                                        </>
                                    </FormSelectField>
                                    <FormTextField
                                        as={Col}
                                        controlId="formGridZip"
                                        label='Zip'
                                        placeholder='10000'
                                        name='postalCode'
                                        type='text'
                                    />
                                </Row>
                            </>
                            :
                            values.shipmentMethod === shipmentMethods.courier.value ?
                                <>
                                    <Row className="mb-3">
                                        <FormTextField
                                            as={Col}
                                            controlId="formGridAddress1"
                                            label='House and street'
                                            placeholder='1234 Main St'
                                            name='address'
                                            type='text'
                                        />
                                    </Row>
                                    <Row className="mb-3">
                                        <FormTextField
                                            as={Col}
                                            controlId="formGridCity"
                                            label='City'
                                            placeholder='New York'
                                            name='city'
                                            type='text'
                                        />
                                        <FormSelectField
                                            as={Col}
                                            controlId="formGridState"
                                            label='State'
                                            placeholder='New York'
                                            name='state'
                                            type='text'
                                            defaultValue={authUserState.isLoggedIn && authUserState.address.state ? authUserState.address.state : 'Choose...'}
                                        >
                                            <>
                                                <option disabled>Choose...</option>
                                                {states.map((state) => (
                                                    <option key={state.value}
                                                            value={state.value}>{state.label}</option>
                                                ))}
                                            </>
                                        </FormSelectField>
                                        <FormTextField
                                            as={Col}
                                            controlId="formGridZip"
                                            label='Zip'
                                            placeholder='10000'
                                            name='postalCode'
                                            type='text'
                                        />
                                    </Row>
                                </>
                                :
                                values.shipmentMethod === shipmentMethods.airDrone.value ?
                                    <>
                                        <Alert key='warning' variant='warning'>
                                            Airdrone shipment is not available now
                                        </Alert>
                                    </>
                                    :
                                    <>
                                    </>
                    }
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