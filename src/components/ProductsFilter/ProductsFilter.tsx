import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import styled from "styled-components";
import {getCategories} from "../../utils/server-api/products/products";
import {replaceDashToSpace} from "../../utils/str/str";
import {ICategories} from "../../utils/server-api/products/products.types";

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
`;

function ProductsFilter({
    searchParams,
    setSearchParams
}: any) {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<ICategories>([]);

    useEffect(() => {
        setIsLoading(true);
        getCategories()
            .then(data => setCategories(data))
            .finally(() => setIsLoading(false));
    }, []);

    const handleClick = (clickedCategory: any) => {
        if (searchParams.get('category') === clickedCategory) {
            searchParams.delete('category');
            setSearchParams({...searchParams});
        } else
            setSearchParams({...searchParams, 'category': clickedCategory})
    }

    return (
        <Form className='mb-4' data-testid={"products-filter"}>
            
            <h3>Filter</h3>
            
            <h4>Categories</h4>
            
            <StyledSection data-testid="categories-filter">
                {!isLoading &&
                    categories.map((item, index) => (<Button
                        variant={item === searchParams.get('category') ? "primary" : "outline-primary"}
                        id={`category-btn-${item}`}
                        key={`category-btn-${index}`}
                        onClick={() => handleClick(item)}
                        data-testid={`category-${item}`}
                    >
                        {replaceDashToSpace(item.toUpperCase())}
                    </Button>))
                }
            </StyledSection>
            {/*<Button variant="primary" type="submit">*/}
            {/*    Filter*/}
            {/*</Button>*/}
        </Form>
    );
}

export default ProductsFilter;