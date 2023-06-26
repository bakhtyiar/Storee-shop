import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {capitalizeStr} from "../../utils/str/str";
import LoaderIndicatorSM from "../LoaderIndicator/LoaderIndicatorSM";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {routes} from "../../utils/constants";
import LoaderIndicatorCentral from "../LoaderIndicator/LoaderIndicatorCental";
import {IAuthorsData, INewsPostData} from "./NewsPost.types";

const NewsPost = () => {
        const {id} = useParams();
        const [newsData, setNewsData] = useState<INewsPostData | null>(null);
        const [authorsData, setAuthorsData] = useState<IAuthorsData | null>(null);
        const [isLoadingPost, setIsLoadingPost] = useState(true);
        const [isLoadingCredentials, setIsLoadingCredentials] = useState(true);

        useEffect(() => {
            const fetchData = async () => {
                if (id === undefined) {
                    return;
                }
                await setNewsData(await getNewsPost(id));
                await setAuthorsData(await getAuthorsData(newsData!.userId));
                setIsLoadingPost(false);
            }
            fetchData().catch(console.error);
        }, []);

        const getNewsPost = async (postId: string | number): Promise<INewsPostData> => {
            await setIsLoadingPost(true);
            let res;
            try {
                res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                res = await res.json();
            } catch (e) {
                if (typeof e === 'string') {
                    throw new Error(e);
                }
                if (e instanceof Error) {
                    throw e;
                }
            }
            return res;
        }

        const getAuthorsData = async (userId: string | number): Promise<IAuthorsData> => {
            await setIsLoadingCredentials(true);
            let res;
            try {
                res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                res = await res.json();
            } catch (e) {
                if (typeof e === 'string') {
                    throw new Error(e);
                }
                if (e instanceof Error) {
                    throw e;
                }
            }
            await setIsLoadingCredentials(false);
            return res;
        }

        return (
            <>

            <Breadcrumb data-testid='breadcrumbs'>

                <Breadcrumb.Item data-testid='breadcrumb-home'><Link to={routes.home.path}>Home</Link></Breadcrumb.Item>

                <Breadcrumb.Item data-testid='breadcrumb-products'><Link
                    to={routes.news.path}>Products</Link></Breadcrumb.Item>

                <Breadcrumb.Item active
                                 data-testid='breadcrumb-current-product'
                >
                    {
                        isLoadingPost &&
                        (
                            newsData === null ||
                            newsData?.title === undefined ||
                            newsData?.title === null)
                            ?
                            (<>...</>)
                            :
                            (<>{newsData!.title.slice(0, 6) + '...'}</>
                            )
                    }
                </Breadcrumb.Item>
            </Breadcrumb>

            {
                isLoadingPost &&
                (
                    newsData === null ||
                    newsData?.title === undefined ||
                    newsData?.title === null ||
                    newsData?.body === undefined ||
                    newsData?.body === null
                )
                ?
                <LoaderIndicatorCentral/>
                :
                <>
                <Row className="">

                <Col className='col-12 col-md-8 col-lg-6'>

                <h1 className="">{capitalizeStr(newsData!.title)}</h1>
    </Col>

        <Col className='col-12 col-md-6 col-lg-4'>

            <p className="">{capitalizeStr(newsData!.body)}...</p>
        </Col>
    </Row>
    {
        isLoadingCredentials ?
            <div className="card-header">
                <LoaderIndicatorSM/>
            </div>
            :
            authorsData?.name !== undefined && authorsData?.name !== null
                ?
                <div className="card-header">
                    {authorsData.name}
                </div>
                :
                <></>
    }
    </>
    }
    </>
    )
        ;
    }
;

export default NewsPost;