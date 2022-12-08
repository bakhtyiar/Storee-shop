import React from 'react';
import styled from 'styled-components';
import imageIcon from '../../assets/img/icons/image/icons8-image-48.png';
import {routes} from '../../utils/constants';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";

const StyledImg = styled.img`
  align-self: center;
  max-width: 100%;
  max-height: 200px;
`;

const ProductCard = ({item}) => {
    return (
        <Link className='px-2 py-3 border rounded d-flex flex-column align-items-start text-decoration-none text-black' to={`${routes.product.path}/${item.id}`} key={item.id}>
            <StyledImg src={imageIcon} alt="image icon"/>
            <h6 className='mt-2'>{item.title}</h6>
            <p>Price: ${item.price}</p>
            <Button variant='dark' className='w-100'>
                <i className="bi bi-bag-plus"></i>
                {' '}
                Add to cart
            </Button>
        </Link>
    );
}

export default ProductCard;
