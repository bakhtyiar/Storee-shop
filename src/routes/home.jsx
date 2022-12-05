import {Button, InputGroup, Form, Container, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react'
import CategoryCard from "../components/CategoryCard/CategoryCard";
import {getCategories} from "../utils/methods";
// todo add images to categories, add searching logic

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchHints, setSearchHints] = useState(["harry potter", "chess", "physics", "tolstoy"]);


    const handleFind = () => {
    };

    useEffect(() => {
        fetch('https://dummyjson.com/quotes/random')
            .then(res => res.json())
            .then(console.log);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getCategories()
            .then(data => setCategories(data))
            .finally(() => setIsLoading(false));
    }, []);


    return (
        <Container>
            <Row>
                <h1>Home</h1>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Recipient's username"
                        id="searchInput"
                        list="searchHints"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <datalist id="searchHints">
                        {
                            searchHints.map((value => (
                                <option value={value} key={value}/>
                            )))
                        }
                    </datalist>
                    <Button variant="outline-secondary" id="button-addon2" onClick={handleFind}>
                        Find
                    </Button>
                </InputGroup>
            </Row>
            <Row>
                {!isLoading &&
                    <div style={{'display': 'flex', 'gap': '18px', 'flexWrap': 'wrap'}}>
                        {
                            categories.map((item) => (
                                <CategoryCard header={item} key={item}/>
                            ))
                        }
                    </div>
                }
            </Row>
        </Container>
    )
}
