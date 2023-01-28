import React, {useContext} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {RootContext} from "../contexts/root-context/root-context";
import {useNavigate} from "react-router-dom";
import {paymentMethods, shipmentMethods} from "../utils/constants";
import {Formik} from "formik";
import * as yup from "yup";
import IdentityForm from "../components/OrderForm/IdentityForm/IdentityForm";
import ShipmentForm from "../components/OrderForm/ShipmentForm/ShipmentForm";
import PaymentForm from "../components/OrderForm/PaymentForm/PaymentForm";
import ProductsForm from "../components/OrderForm/ProductsForm/ProductsForm";
import TermsForm from "../components/OrderForm/TermsForm/TermsForm";

// todo : fix 1.when logged in on page refresh auto fill data to input does not working

const schema = yup.object().shape({
    username: yup.string()
        .min(6, 'Username is too short. Required minimum 6 symbols')
        .max(50, 'Username is too long. Required maximum 50 symbols')
        .required('Username is required'),
    email: yup.string()
        .email('Seems like wrong format of email')
        .required('Email is required'),
    shipmentMethod: yup.string(),
    address: yup.string()
        .min(6, 'Address is too short. Required minimum 6 symbols'),
    city: yup.string()
        .min(4, 'City\'s name is too short. Required minimum 4 symbols'),
    state: yup.string()
        .min(2, 'State\'s name is too short. Required minimum 2 symbols'),
    postalCode: yup.string()
        .min(5, 'Postalcode is too short. Required minimum 6 symbols')
        .max(5, 'Postalcode is too long. Required maximum 6 symbols'),
    paymentMethod: yup.string(),
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
                                <IdentityForm
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    authUserState={authUserState}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <ShipmentForm
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    authUserState={authUserState}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <PaymentForm
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    authUserState={authUserState}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <ProductsForm
                                    products={products}
                                    totalProducts={totalProducts}
                                    totalQuantity={totalQuantity}
                                />
                               <TermsForm
                                   touched={touched}
                                   errors={errors}
                                   handleChange={handleChange   }
                                   handleBlur={handleBlur}
                               />
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