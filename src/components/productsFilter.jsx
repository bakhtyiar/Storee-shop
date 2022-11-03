import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {getCategories} from "../utils/methods";

// todo restyle categories to onClick->setCategory rounded buttons

function ProductsFilter({ setCategory }) {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        setIsLoading(true);
        getCategories()
            .then(data => setCategories(data))
            .finally(() => setIsLoading(false));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setCategory(selectedCategory);
    }

    return (
        <Form style={{"marginBottom": "16px"}} onSubmit={handleSubmit}>
            <h3>Filter</h3>
            <h4>Categories</h4>
            <section style={{'margin': '8px 0'}}>
                {!isLoading &&
                    categories.map((item, index) => (<Form.Check
                        inline
                        label={item}
                        name="categories"
                        type="radio"
                        id={`inline-checkbox-${index}`}
                        key={`inline-checkbox-${index}`}
                        onClick={() => setSelectedCategory(item)}
                    />))
                }
            </section>
            <Button variant="primary" type="submit">
                Filter
            </Button>
        </Form>
    );
}

export default ProductsFilter;