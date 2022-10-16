import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pagination as BPagination } from 'react-bootstrap';

export const Pagination = ({ pagesAmount }) => {
	const { page } = useParams();
	const navigate = useNavigate();

	const handleClick = (number) => {
		navigate(`/products/${number}`);
	};

	return (
		<BPagination>
			{(Number(page) > 1) && <BPagination.First onClick={() => navigate(`/products/${1}`)}/>}
			{(Number(page) > 1) && <BPagination.Prev onClick={() => navigate(`/products/${Number(page) - 1}`)}/>}
			{pagesAmount && [...Array(pagesAmount)]
			.map((_, i) => ++i)
			.map((number) => (
				<BPagination.Item
					key={number}
					active={number === Number(page)}
					onClick={e => handleClick(number)}
				>
					{number}
				</BPagination.Item>
			))}
			{ (Number(page) != pagesAmount) && <BPagination.Next onClick={() => navigate(`/products/${Number(page) + 1}`)}/> }
			{ (Number(page) != pagesAmount) && <BPagination.Last onClick={() => navigate(`/products/${pagesAmount}`)}/>}
		</BPagination>
	);
}
