import React, {useContext} from 'react';
import {RootContext} from "../../contexts/root-context";
import {Link} from "react-router-dom";
import {routes} from "../../utils/constants";
import imageIcon from "../../assets/img/icons/image/icons8-image-48.png";
import {Button} from "react-bootstrap";
import styled from "styled-components";

const StyledImg = styled.img`
  align-self: center;
  max-width: 100%;
  max-height: 200px;
`;

const CartProductCard = ({product, selfIndexInCart}) => {
    const { cartState: { onRemoveFromCart } } = useContext(RootContext);

    return (
        <Link className='px-2 py-3 border rounded d-flex flex-column align-items-start text-decoration-none text-black' to={`${routes.product.path}/${product.id}`}>
            <StyledImg src={imageIcon} alt="image icon"/>
            <h6 className='mt-2'>{product.title}</h6>
            <p>Price: {product.price}</p>
            <p>Amount: {product.quantity}</p>
            <Button
                variant='dark'
                className='w-100'
                onClick={ (e) => {
                    e.preventDefault();
                    onRemoveFromCart(selfIndexInCart);
                }}
            >
                <i className="bi bi-x"></i>
                {' '}
                Remove from cart
            </Button>
        </Link>
    );
};

export default CartProductCard;