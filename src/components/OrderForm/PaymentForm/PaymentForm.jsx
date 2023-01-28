import React from 'react';
import {Card, Form} from "react-bootstrap";
import {Field} from "formik";
import {paymentMethods} from "../../../utils/constants";

const PaymentForm = () => {
    return (
        <Card body>
            <h5>Payment</h5>
            <Form.Group className='mb-3'>
                <h6>Way to pay</h6>
                <Form.Check
                    as={Field}
                    inline
                    label={paymentMethods.card.label}
                    name="paymentMethod"
                    value={paymentMethods.card.value}
                    type='radio'
                    id={`paymentMethod-1`}
                />
                <Form.Check
                    as={Field}
                    inline
                    label={paymentMethods.cash.label}
                    name="paymentMethod"
                    value={paymentMethods.cash.value}
                    type='radio'
                    id={`paymentMethod-2`}
                />
                <Form.Check
                    as={Field}
                    inline
                    label={paymentMethods.inShare.label}
                    name="paymentMethod"
                    value={paymentMethods.inShare.value}
                    type='radio'
                    id={`paymentMethod-3`}
                />
            </Form.Group>
        </Card>
    );
};

export default PaymentForm;