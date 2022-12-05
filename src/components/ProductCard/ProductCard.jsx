import React from 'react';
import styled from 'styled-components';
import imageIcon from '../../assets/img/icons/image/icons8-image-48.png';
import {routes} from '../../utils/constants';
import {Link} from 'react-router-dom';

const StyledProductCard = styled.li`
	padding: 12px 8px;
	border-radius: 8px;
	border: 1px solid #cecece;
	display: flex;
	align-items: center;
	& * {
		margin: 0;
	}
`;

const StyledLink = styled(Link)`
	color: inherit;
	text-decoration: inherit;
`;

const StyledImg = styled.img`
	align-self: center;
	max-width: 100%;
	max-height: 200px;
`;

const ProductCard = ({item}) => {
	return (
		<StyledLink to={`${routes.product.path}/${item.id}`}>
			<StyledProductCard key={item.id}>
				<StyledImg src={imageIcon} alt="image icon" />
				<h6>{item.title}</h6>
				<p>Price: ${item.price}</p>
			</StyledProductCard>
		</StyledLink>
	);
}

export default ProductCard;
