import React, {useContext} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {RootContext} from "../contexts/root-context/root-context";
import CartProductCard from "../components/CartProductCard/CartProductCard";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/constants";

const Cart = () => {
    const {cartState: {products, total, discountedTotal, totalProducts, totalQuantity}} = useContext(RootContext);
    const navigate = useNavigate();

    return (
        <Container className='mt-4'>
            <Row>
                <Col xs={12} md={8}>
                    <h1>Cart</h1>
                    {products.length > 0 ? (
                        <>
                            {products.map((product, index) => (
                                <CartProductCard product={product} selfIndexInCart={index} key={product.id}/>
                            ))}
                            <h5 className='mt-3'>Amount: {totalProducts} Quantity: {totalQuantity}</h5>
                        </>
                    ) : (
                        <h3>Nothing here</h3>
                    )}
                </Col>
                <Col xs={12} md={4}>
                    <h3>Order</h3>
                    <Form.Group className="mb-3 w-50" controlId="formBasicUsername">
                        <Form.Label>Promocode</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter promocode"
                            name="promocode"
                        />
                    </Form.Group>
                    <p>Total: $<b style={{textDecoration: 'line-through'}}>{total}</b> ${discountedTotal}</p>
                    <Button onClick={() => navigate(routes.order.path)}>Make order</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
