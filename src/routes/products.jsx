import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { pageLimit } from '../utils/constants';
import { getData } from '../utils/methods';
import { Pagination } from '../components/pagination';
import imageIcon from '../materials/img/icons/image/icons8-image-48.png';
import { Placeholder } from 'react-bootstrap';

const StyledProducts = styled.div`
	width: 100%;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

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

const StyledImg = styled.img`
	align-self: center;
	max-width: 100%;
	max-height: 200px;
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
		<StyledProducts>
			<h1>Products</h1>
			<>
				<h3>Filter</h3>
				<label>
					<input type={'checkbox'} />
					option one
				</label>
				<label>
					<input type={'checkbox'} />
					option two
				</label>
				<label>
					<input type={'checkbox'} />
					option three
				</label>
				<button>Filter!</button>
			</>
			<StyledUl>
				{
					isLoading && (data === null) ? (
						<>
							{
								[...Array(6)].map(() => (
									<Placeholder as="p" animation="wave">
										<Placeholder xs={12} />
									</Placeholder>
								))
							}
						</>
					) : (
						<>
							{data.products.map(item => (
								<StyledProductCard key={item.id}>
									<StyledImg src={imageIcon} alt="image icon" />
									<h6>{item.title}</h6>
									<p>Price: ${item.price}</p>
								</StyledProductCard>
							))
							}
							<Pagination pagesAmount={pagesAmount} />
						</>
					)
				}
			</StyledUl>
		</StyledProducts>
	);
}

export default Products;