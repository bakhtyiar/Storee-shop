import React, {useEffect, useState} from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import {pageLimit, routes} from '../utils/constants';
import {Breadcrumb, Col, Container, Placeholder, Row, Spinner} from 'react-bootstrap';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard/ProductCard';
import {Pagination} from '../components/Pagination/Pagination';
import ProductsFilter from "../components/ProductsFilter/ProductsFilter";
import {getProducts} from "../utils/server-api/products/products";

const StyledContainer = styled(Container)`
  padding-top: 16px;
`;

const Products = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const {page} = useParams();
    const [pagesAmount, setPagesAmount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    let category = searchParams.get('category');

    function calcPagesAmount(total, pageLimit) {
        return (Math.floor(total / pageLimit) + (total % pageLimit > 0 ? 1 : 0));
    }

    useEffect(() => {
        setIsLoading(true);
        getProducts((Number(page) - 1) * pageLimit, pageLimit, category || '')
            .then(data => setData(data))
            .finally(() => setIsLoading(false));
    }, [page, category]);

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
            <ProductsFilter searchParams={searchParams} setSearchParams={setSearchParams}/>
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
                            <Row xs={1} sm={3} lg={6}>
                                {data.products.map(item => (
                                    <Col className='mb-4' key={item.id}>
                                        <ProductCard item={item}/>
                                    </Col>
                                ))}
                            </Row>
                            {1 < pagesAmount && <Pagination pagesAmount={pagesAmount}/>}
                        </>
                    )
                }
            </div>
        </StyledContainer>
    );
}

export default Products;