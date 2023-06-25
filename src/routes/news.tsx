import React, {useEffect, useState} from 'react';
import NewsCard from "../components/NewsCard/NewsCard";
import {Col, Row} from "react-bootstrap";
import LoaderIndicatorCentral from "../components/LoaderIndicator/LoaderIndicatorCental";

export default function News() {
    const [newsData, setNewsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNews();
    }, [pageNumber]);

    const getNews = () => {
        setIsLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then(response => response.json())
            .then(data => setNewsData(data))
            .finally(() => setIsLoading(false));
    }

    return (
        <>
            <h1>News</h1>
            {isLoading ? <LoaderIndicatorCentral/> : <>
                <Row>
                    {newsData.map((post) => (
                        <Col className='col-12 col-md-6 col-lg-4 mb-3' key={post.id}>
                            <NewsCard post={post}/>
                        </Col>
                    ))}
                </Row>
            </>}
        </>
    )
}
