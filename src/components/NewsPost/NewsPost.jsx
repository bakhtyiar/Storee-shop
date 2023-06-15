import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {capitalizeStr} from "../../utils/str/str";
import LoaderIndicatorSM from "../LoaderIndicator/LoaderIndicatorSM";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {routes} from "../../utils/constants";
import LoaderIndicatorCentral from "../LoaderIndicator/LoaderIndicatorCental";

const NewsPost = ({product, selfIndexInCart}) => {
    const {id} = useParams();
    const [newsData, setNewsData] = useState(null);
    const [authorsData, setAuthorsData] = useState(null);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    const [isLoadingCredentials, setIsLoadingCredentials] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getNewsPost(id);
            console.log('id')
            console.log(id)
            console.log('newsData')
            console.log(newsData)
            await getAuthorsData(newsData.userId);
            setIsLoadingPost(false);
        }
        fetchData().catch(console.error);
    }, []);

    const getNewsPost = async (postId) => {
        await setIsLoadingPost(true);
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        response = await response.json();
        console.log('response')
        console.log(response)
        await setNewsData(response);
        console.log('newsData')
        console.log(newsData)
    }

    const getAuthorsData = async (userId) => {
        await setIsLoadingCredentials(true);
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        response = await response.json();
        await setIsLoadingCredentials(response);
    }

    return (
        <>
            <Breadcrumb data-testid='breadcrumbs'>
                <Breadcrumb.Item data-testid='breadcrumb-home'><Link to={routes.home.path}>Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item data-testid='breadcrumb-products'><Link to={routes.news.path}>Products</Link></Breadcrumb.Item>
                <Breadcrumb.Item active data-testid='breadcrumb-current-product'>{isLoadingPost && (newsData === null) ? (<>...</>) : (<>{newsData.title.slice(0, 6)+'...'}</>)}</Breadcrumb.Item>
            </Breadcrumb>
            {isLoadingPost ? <LoaderIndicatorCentral/> : <>
                <Row className="">
                    <Col className='col-12 col-md-8 col-lg-6'>
                        <h1 className="">{capitalizeStr(newsData.title)}</h1>
                    </Col>
                    <Col className='col-12 col-md-6 col-lg-4'>
                        <p className="">{capitalizeStr(newsData.body)}...</p>
                    </Col>
                </Row>
                <div className="card-header">
                    {isLoadingCredentials ? <LoaderIndicatorSM/> : authorsData.name}
                </div>
            </>}
        </>
    );
};

export default NewsPost;