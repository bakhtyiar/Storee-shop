import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pageLimit, routes } from '../utils/constants';
import { getData } from '../utils/methods';
import { Pagination } from '../components/pagination';
import ProductCard from '../components/productCard';
import { Breadcrumb, Button, Container, Form, Placeholder, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
	padding-top: 16px;
`;

const StyledForm = styled(Form)`
	margin-bottom: 16px;
`;

const Products = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const { page } = useParams();
	const [pagesAmount, setPagesAmount] = useState(0);
	const isPagesAmountCalced = useRef(false);

	function calcPagesAmount(total, pageLimit) {
		return (Math.floor(total / pageLimit) + (total % pageLimit > 0 ? 1 : 0));
	};

	useEffect(() => {
		setIsLoading(true);
		getData((Number(page) - 1) * pageLimit, pageLimit)
			.then(data => setData(data))
			.finally(() => setIsLoading(false));
	}, [page]);

	useEffect(() => {
		if (data && !isPagesAmountCalced.current) {
			setPagesAmount(calcPagesAmount(data.total, data.limit));
			isPagesAmountCalced.current = true;
		}
	}, [data]);

	return (
		<StyledContainer>
			<h1>Products</h1>
			<Breadcrumb>
				<Breadcrumb.Item><Link to={routes.home.path}>Home</Link></Breadcrumb.Item>
				<Breadcrumb.Item active>Products</Breadcrumb.Item>
			</Breadcrumb>
			<StyledForm>
				<h3>Filter</h3>
				<Form.Check
					inline
					label="Laptops"
					name="group1"
					type="checkbox"
					id={`inline-checkbox-1`}
				/>
				<Form.Check
					inline
					label="SmartPhones"
					name="group1"
					type="checkbox"
					id={`inline-checkbox-2`}
				/>
				<Form.Check
					inline
					label="Other"
					name="group1"
					type="checkbox"
					id={`inline-checkbox-3`}
				/>
				<Button variant="primary" type="submit">
					Filter
				</Button>
			</StyledForm>
			<div>
				{
					isLoading && (data === null) ? (
						<>
							{[...Array(6)].map(() => (
								<Placeholder as="p" animation="wave">
									<Placeholder xs={12} />
								</Placeholder>
							))}
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</>
					) : (
						<>
							{data.products.map(item => <ProductCard item={item} />)}
							<Pagination pagesAmount={pagesAmount} />
						</>
					)
				}
			</div>
		</StyledContainer>
	);
}

export default Products;