import React, {useEffect, useState} from 'react';
import NewsCard from "../components/NewsCard/NewsCard";
import {Col, Row} from "react-bootstrap";
import LoaderIndicatorCentral from "../components/LoaderIndicator/LoaderIndicatorCental";
import {INewsPostData} from "../components/NewsPost/NewsPost.types";
import LoadingErrorSection from "../components/LoadingErrorSection/LoadingErrorSection";

export default function News() {
    const [newsData, setNewsData] = useState<INewsPostData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let x = async () => setNewsData(await getNews());
        x();
    }, []);

    const getNews = async (): Promise<INewsPostData[]> => {
        await setIsLoading(true);
        let res;
        try {
            res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
            res = await res.json()
        } catch (e) {
            if (typeof e === 'string') {
                throw new Error(e);
            }
            if (e instanceof Error) {
                throw e;
            }
        }
        await setIsLoading(false);
        return res;
    }

    return <>

        <h1>News</h1>

        {
            isLoading
                ?
                <LoaderIndicatorCentral/>
                :
                newsData !== undefined && newsData !== null
                    ?
                    <Row>
                        {newsData.map((post: any) => <Col className='col-12 col-md-6 col-lg-4 mb-3' key={post.id}>

                            <NewsCard post={post}/>
                        </Col>)}
                    </Row>
                    :
                    <LoadingErrorSection/>
        }
    </>;
}
