import React, { useEffect, useState } from 'react';
import { Badge, Breadcrumb, Carousel, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../utils/constants';
import { getProduct } from '../utils/methods';

const StyledContainer = styled(Container)`
	padding-top: 16px;
`;

const StyledCarousel = styled(Carousel)`
	width: 640px;
	height: 360px;
	overflow: hidden;
	background-color: rgba(0,0,0,0.1);
`;

const StyledCarouselItem = styled(Carousel.Item)`
	width: 640px;
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
		<StyledContainer>
			<Breadcrumb>
				<Breadcrumb.Item ><Link to={routes.home.path}>Home</Link></Breadcrumb.Item>
				<Breadcrumb.Item><Link to={routes.products.path}>Products</Link></Breadcrumb.Item>
				<Breadcrumb.Item active>{isLoading && (data === null) ? (<>...</>) : (<>{id}</>)}</Breadcrumb.Item>
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
						<Col>
							<h1>{data.title}</h1>
							<h2>{data.description}</h2>
							<h3>Price: ${data.price} Discount:  <Badge bg="warning" text="dark">{data.discountPercentage}%</Badge></h3>
							<p>Rating: {data.rating}</p>
							<p>Stock: {data.stock}</p>
							<p>Brand: {data.brand}</p>
							<p>Category: {data.category}</p>
						</Col>
						<Col>
							<StyledCarousel fade="true" variant="dark">
								{data.images.map((item, index) => (
									<StyledCarouselItem>
										<StyledImg key={item} src={item} alt={`Carousel item ${index} slide`} />
									</StyledCarouselItem>
								))}
							</StyledCarousel>
						</Col>
					</Row>
				)
			}
		</StyledContainer>
	);
}

export default Product;
