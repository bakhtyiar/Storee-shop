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
	width: fit-content;
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
		console.log(data);
	}, [id]);

	return (
		<StyledContainer>
			<Breadcrumb>
				<Breadcrumb.Item ><Link to={routes.home.path}>Home</Link></Breadcrumb.Item>
				<Breadcrumb.Item><Link to={routes.products.path}>Products</Link></Breadcrumb.Item>
				<Breadcrumb.Item active>{isLoading && (data === null) ? (<>...</>) : (<>{id}</>)}</Breadcrumb.Item>
			</Breadcrumb>
			{
				isLoading && (data === null) ? (
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
							<StyledCarousel>
								{data.images.map((item, index) => (
									<Carousel.Item>
										<img key={item} src={item} alt={`Carousel item ${index} slide`} />
									</Carousel.Item>
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
