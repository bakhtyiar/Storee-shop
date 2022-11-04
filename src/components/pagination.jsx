import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Pagination as BPagination } from 'react-bootstrap';
import styled from "styled-components";

const StyledBPagination = styled(BPagination)`
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 16px 0 24px 0;
`;

export const Pagination = ({ pagesAmount }) => {
	const { page } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = (number) => {
		navigate(`${location.pathname.replace(/[^/]*$/, number)}`);
	};

	return (
		<StyledBPagination>
			{(Number(page) > 1) && <>
				<BPagination.First onClick={() => handleClick(1)} />
				<BPagination.Prev onClick={() => handleClick(Number(page) - 1)} />
			</>}
			{pagesAmount && [...Array(pagesAmount)]
				.map((_, i) => ++i)
				.map((number) => (
					<BPagination.Item
						key={number}
						active={number === Number(page)}
						onClick={() => handleClick(number)}
					>
						{number}
					</BPagination.Item>
				))}
			{(Number(page) !== Number(pagesAmount)) && <>
				<BPagination.Next onClick={() => handleClick(Number(page) + 1)} />
				<BPagination.Last onClick={() => handleClick(pagesAmount)} />
			</>}
		</StyledBPagination>
	);
}
