import React, {useContext} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {RootContext} from "../contexts/root-context";
import CartProductCard from "../components/CartProductCard/CartProductCard";

const Cart = () => {
    const {cartState: {products, total, discountedTotal, totalQuantity}} = useContext(RootContext);
    return (
        <Container>
            <Row>
                <Col xs={12} md={8}>
                    <h1>Cart</h1>
                    {products.length > 0 ? (
                        <>
                            {products.map((product, index) => (
                                <CartProductCard product={product} selfIndexInCart={index} key={product.id}/>
                            ))}
                            <h5 className='mt-3'>Amount: {totalQuantity}</h5>
                        </>
                    ) : (
                        <h3>Nothing here</h3>
                    )}
                </Col>
                <Col xs={12} md={4}>
                    <h3>R Col</h3>
                    <p>Total: </p>
                    <p className='text-decoration-line-through'>{total}</p>
                    <p>{discountedTotal}</p>
                    <p></p>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
