import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pageLimit, routes } from '../utils/constants';
import { getData } from '../utils/methods';
import { Pagination } from '../components/pagination';
import ProductCard from '../components/productCard';
import { Breadcrumb, Container, Placeholder, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import ProductsFilter from "../components/productsFilter";

const StyledContainer = styled(Container)`
	padding-top: 16px;
`;

const Products = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const { page } = useParams();
	const [pagesAmount, setPagesAmount] = useState(0);
	const isPagesAmountCalced = useRef(false);

	function calcPagesAmount(total, pageLimit) {
		return (Math.floor(total / pageLimit) + (total % pageLimit > 0 ? 1 : 0));
	}

	useEffect(() => {
		setIsLoading(true);
		getData((Number(page) - 1) * pageLimit, pageLimit)
			.then(data => setData(data))
			.finally(() => setIsLoading(false));
	}, [page]);

	useEffect(() => {
		if (data) {
			setPagesAmount(calcPagesAmount(data.total, pageLimit));
		}
	}, [data]);

	return (
		<StyledContainer>
			<h1>Products</h1>
			<Breadcrumb>
				<Breadcrumb.Item><Link to={routes.home.path}>Home</Link></Breadcrumb.Item>
				<Breadcrumb.Item active>Products</Breadcrumb.Item>
			</Breadcrumb>
			<ProductsFilter/>
			<div>
				{
					isLoading && (data === null) ? (
						<>
							{[...Array(6)].map((_, index) => (
								<Placeholder as="p" animation="wave" key={`placeholder-${index}`}>
									<Placeholder xs={12}/>
								</Placeholder>
							))}
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</>
					) : (
						<>
							{data.products.map(item => <ProductCard item={item}/>)}
							{ 1 < pagesAmount && <Pagination pagesAmount={pagesAmount}/>}
						</>
					)
				}
			</div>
		</StyledContainer>
	);
}

export default Products;