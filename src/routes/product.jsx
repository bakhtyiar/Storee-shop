import React, {useContext, useEffect, useState} from 'react';
import {Badge, Breadcrumb, Button, Carousel, Col, Row, Spinner} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../utils/constants';
import {getProduct} from "../utils/server-api/products/products";
import {RootContext} from "../contexts/root-context/root-context";

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
	const {cartState: {onAddToCart}} = useContext(RootContext);
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
			<Breadcrumb data-testid='breadcrumbs'>
				<Breadcrumb.Item data-testid='breadcrumb-home'><Link to={routes.home.path}>Home</Link></Breadcrumb.Item>
				<Breadcrumb.Item data-testid='breadcrumb-products'><Link to={routes.products.path}>Products</Link></Breadcrumb.Item>
				<Breadcrumb.Item active data-testid='breadcrumb-current-product'>{isLoading && (data === null) ? (<>...</>) : (<>{data.title}</>)}</Breadcrumb.Item>
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
							<div className={'d-flex align-items-start gap-1'}>
								<h3>Price: <strike>${data.price}</strike> </h3>
								<Badge bg="warning" text="dark">{data.discountPercentage}%</Badge>
								<h3 className={'mx-2'}>${Math.round(data.price * (100 - data.discountPercentage) / 100)}</h3>
							</div>
							<p>Rating: <i className="bi bi-star-fill text-warning"></i> {data.rating}</p>
							<p>Stock: {data.stock}</p>
							<p>Brand: {data.brand}</p>
							<p>Category: {data.category}</p>
							<Button variant="dark"
									className='me-3'
									data-testid='add-to-cart-button'
									onClick={(e) => {
								e.preventDefault();
								onAddToCart(data.id);
							}}>Add to cart</Button>
							{/*<Button variant="outline-dark"*/}
							{/*		data-testid='buy-now-button'*/}
							{/*		onClick={(e) => {*/}
							{/*			e.preventDefault();*/}
							{/*		}}>Buy now</Button>*/}
						</Col>
					</Row>
				)
			}
		</>
	);
}

export default Product;
