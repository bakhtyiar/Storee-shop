import React from 'react';
import {Accordion, ListGroup} from "react-bootstrap";
import OrderProductCard from "../../OrderProductCard/OrderProductCard";

const ProductsForm = ({products, totalProducts, totalQuantity}) => {
    return (
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
    );
};

export default ProductsForm;