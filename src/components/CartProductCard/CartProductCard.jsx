import React, {useContext, useEffect, useState} from 'react';
import {RootContext} from "../../contexts/root-context/root-context";
import {Link} from "react-router-dom";
import {routes} from "../../utils/constants";
import imageIcon from "../../assets/img/icons/image/icons8-image-48.png";
import {Button, Form} from "react-bootstrap";
import styled from "styled-components";

const StyledImg = styled.img`
  align-self: center;
  max-width: 100%;
  max-height: 200px;
`;

const CartProductCard = ({product, selfIndexInCart}) => {
    const {cartState: {onRemoveFromCart, onUpdateQuantity}} = useContext(RootContext);
    const [quantity, setQuantity] = useState(product.quantity);

    useEffect(() => {
        if (quantity < 1) {
            onRemoveFromCart(selfIndexInCart);
        } else {
            onUpdateQuantity(product.id, quantity);
        }
    }, [quantity]);

    return (
        <div className='px-2 py-3 border rounded d-flex flex-row align-items-center text-decoration-none text-black'>
            <Link className='w-100 d-flex flex-row text-decoration-none text-black'
                  to={`${routes.product.path}/${product.id}`}>
                <StyledImg src={imageIcon} alt="image icon"/>
                <div className='flex-column ms-2'>
                    <h6 className='mt-2'>{product.title}</h6>
                    <p className='my-0'>Price: {product.price}</p>
                </div>
            </Link>
            <div className='ml-3 d-flex gap-2'>
                <div className='d-flex'>
                    <Button
                        variant="outline-dark"
                        onClick={() => {
                            setQuantity((prevState) => prevState - 1);
                        }}
                    >
                        -
                    </Button>
                    <Form.Control
                        type="number"
                        value={quantity}
                        placeholder="Quantity"
                        onChange={(e) => {
                            setQuantity(Number(e.target.value));
                        }}
                    />
                    <Button
                        variant="outline-dark"
                        onClick={() => {
                            setQuantity((prevState) => prevState + 1);
                        }}
                    >
                        +
                    </Button>
                </div>
                <Button
                    variant='outline-dark'
                    className='d-flex rounded'
                    onClick={(e) => {
                        e.preventDefault();
                        onRemoveFromCart(selfIndexInCart);
                    }}
                >
                    <i className="bi bi-x"></i>
                    {' '}
                    Remove
                </Button>
            </div>
        </div>
    );
};

export default CartProductCard;