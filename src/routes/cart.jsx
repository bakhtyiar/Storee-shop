import React, {useContext} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {RootContext} from "../contexts/root-context/root-context";
import CartProductCard from "../components/CartProductCard/CartProductCard";
import {Link} from "react-router-dom";
import {routes} from "../utils/constants";

const Cart = () => {
    const {cartState: {products, total, discountedTotal, totalProducts, totalQuantity}} = useContext(RootContext);

    return (
        <Container className='mt-4'>
            <Row>
                <h2 className='mb-3'>Cart</h2>
                <Col xs={12} md={8}>
                    {products.length > 0 ? (
                        <>
                            <Col className='d-flex flex-column gap-2'>
                                {products.map((product, index) => (
                                    <CartProductCard product={product} selfIndexInCart={index} key={product.id}/>
                                ))}
                            </Col>
                            <h5 className='mt-3'>Amount: {totalProducts} Quantity: {totalQuantity}</h5>
                        </>
                    ) : (
                        <h3>Nothing here</h3>
                    )}
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
                        <Button as={Link} to={routes.order.path} className='w-100'>Make order</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
