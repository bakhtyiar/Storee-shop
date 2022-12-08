import React from 'react';
import styled from 'styled-components';
import imageIcon from '../../assets/img/icons/image/icons8-image-48.png';
import {routes} from '../../utils/constants';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";

const StyledProductCard = styled(Link)`
  padding: 12px 8px;
  border-radius: 8px;
  border: 1px solid #cecece;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: inherit;
  text-decoration: inherit;

  & * {
    margin: 0;
  }
`;

const StyledImg = styled.img`
  align-self: center;
  max-width: 100%;
  max-height: 200px;
`;

const ProductCard = ({item}) => {
    return (
        <StyledProductCard to={`${routes.product.path}/${item.id}`} key={item.id}>
            <StyledImg src={imageIcon} alt="image icon"/>
            <h6 className='mt-2'>{item.title}</h6>
            <p>Price: ${item.price}</p>
            <Button variant='dark' className='w-100 mt-2'>
                <i className="bi bi-bag-plus"></i>
                {' '}
                Add to cart
            </Button>
        </StyledProductCard>
    );
}

export default ProductCard;
