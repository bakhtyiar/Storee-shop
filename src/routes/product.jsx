import React, { useEffect, useState } from 'react';
import {Badge, Breadcrumb, Button, Carousel, Col, Row, Spinner} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../utils/constants';
import {getProduct} from "../utils/server-api/products/products";

const StyledCarousel = styled(Carousel)`
	max-width: 640px;
	height: 360px;
	overflow: hidden;
	background-color: rgba(0,0,0,0.1);
`;

const StyledCarouselItem = styled(Carousel.Item)`
	max-width: 640px;
	height: 360px;
`;

const StyledImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const Product = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		getProduct(id)
			.then(data => setData(data))
			.finally(() => setIsLoading(false));
	}, [id]);

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item ><Link to={routes.home.path}>Home</Link></Breadcrumb.Item>
				<Breadcrumb.Item><Link to={routes.products.path}>Products</Link></Breadcrumb.Item>
				<Breadcrumb.Item active>{isLoading && (data === null) ? (<>...</>) : (<>{data.title}</>)}</Breadcrumb.Item>
			</Breadcrumb>
			{
				isLoading && data === null ? (
					<>
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					</>
				) : (
					<Row>
						<Col sm={12} md={6}>
							<StyledCarousel fade="true" variant="dark">
								{data.images.map((item, index) => (
									<StyledCarouselItem key={item}>
										<StyledImg src={item} alt={`Carousel item ${index} slide`} />
									</StyledCarouselItem>
								))}
							</StyledCarousel>
						</Col>
						<Col>
							<h1>{data.title}</h1>
							<h2>{data.description}</h2>
							<h3>Price: ${data.price} Discount:  <Badge bg="warning" text="dark">{data.discountPercentage}%</Badge></h3>
							<p>Rating: {data.rating}</p>
							<p>Stock: {data.stock}</p>
							<p>Brand: {data.brand}</p>
							<p>Category: {data.category}</p>
							<Button variant="dark" className='me-3'>Add to cart</Button>
							<Button variant="outline-dark">Buy now</Button>
						</Col>
					</Row>
				)
			}
		</>
	);
}

export default Product;
