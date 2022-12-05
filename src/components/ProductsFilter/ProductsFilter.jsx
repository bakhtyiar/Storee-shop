import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {getCategories, replaceDashToSpace} from "../../utils/methods";
import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
`;

function ProductsFilter({searchParams, setSearchParams}) {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getCategories()
            .then(data => setCategories(data))
            .finally(() => setIsLoading(false));
    }, []);

    const handleClick = (clickedCategory) => {
        if (searchParams.get('category') === clickedCategory) {
            searchParams.delete('category');
            setSearchParams({...searchParams});
        } else
            setSearchParams({...searchParams, 'category': clickedCategory})
    }

    return (
        <Form style={{"marginBottom": "16px"}}>
            <h3>Filter</h3>
            <h4>Categories</h4>
            <StyledSection>
                {!isLoading &&
                    categories.map((item, index) => (<Button
                        variant={item === searchParams.get('category') ? "primary" : "outline-primary"}
                        id={`category-btn-${item}`}
                        key={`category-btn-${index}`}
                        onClick={() => handleClick(item)}
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