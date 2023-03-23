import {Button, InputGroup, Form, Row, Col} from 'react-bootstrap';
import React, {useEffect, useState} from 'react'
import CategoryCard from "../components/CategoryCard/CategoryCard";
import {getCategories} from "../utils/server-api/products/products";
import smartphonePic from '../assets/img/product_categories/smartphones.png';
import skincarePic from '../assets/img/product_categories/skincare.png';
import furniturePic from '../assets/img/product_categories/furniture.png';
import sunglassesPic from '../assets/img/product_categories/sunglasses.png';
// todo add searching logic
//todo : add random product category 'you may like'


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
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getCategories()
            .then(data => setCategories(data))
            .finally(() => setIsLoading(false));
    }, []);


    return (
        <>
            <Row>
                <h3>Home</h3>
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
            <div className={'mt-3'}>
                <h3>Popular</h3>
                <Row className={'d-flex'}>
                    {(categories.includes('smartphones') !== -1) &&
                        <Col xxs={6} md={3}><CategoryCard header={'smartphones'} key={'smartphones' + 'Pictured'}
                                                         picture={smartphonePic}/></Col>
                    }
                    {(categories.includes('skincare') !== -1) &&
                        <Col xxs={6} md={3}><CategoryCard header={'skincare'} key={'skincare' + 'Pictured'}
                                                         picture={skincarePic}/></Col>
                    }
                    {(categories.includes('furniture') !== -1) &&
                        <Col xxs={6} md={3}><CategoryCard header={'furniture'} key={'furniture' + 'Pictured'}
                                                         picture={furniturePic}/></Col>
                    }
                    {(categories.includes('sunglasses') !== -1) &&
                        <Col xxs={6} md={3}><CategoryCard header={'sunglasses'} key={'sunglasses' + 'Pictured'}
                                                         picture={sunglassesPic}/></Col>
                    }
                </Row>
            </div>
            <div className={'mt-3'}>
                <h3>Categories</h3>
                <Row>
                    {!isLoading &&
                        <div
                            className='d-flex gap-2 flex-wrap'
                        >
                            {
                                categories.map((item) => (
                                    <CategoryCard header={item} key={item}/>
                                ))
                            }
                        </div>
                    }
                </Row>
            </div>
        </>
    )
}
