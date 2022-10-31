import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import styled from "styled-components";

const StyledForm = styled(Form)`
  margin-bottom: 16px;
`;

function ProductsFilter() {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <StyledForm>
            <h3>Filter</h3>
            <h4>Categories</h4>
            <section>
                {!isLoading &&
                    categories.map((item, index) => (<Form.Check
                        inline
                        label={item}
                        name="categories"
                        type="radio"
                        id={`inline-checkbox-${index}`}
                    />))
                }
            </section>
            <Button variant="primary" type="submit">
                Filter
            </Button>
        </StyledForm>
    );
}

export default ProductsFilter;