import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {getCategories, replaceDashToSpace} from "../utils/methods";
import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
`;

function ProductsFilter({ category, setCategory }) {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getCategories()
            .then(data => setCategories(data))
            .finally(() => setIsLoading(false));
    }, []);

    const handleClick = (clickedCategory) => {
        if (category === clickedCategory)
            setCategory('')
        else
            setCategory(clickedCategory)
    }

    return (
        <Form style={{"marginBottom": "16px"}}>
            <h3>Filter</h3>
            <h4>Categories</h4>
            <StyledSection>
                {!isLoading &&
                    categories.map((item, index) => (<Button
                        variant={item === category ? "primary" : "outline-primary"}
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