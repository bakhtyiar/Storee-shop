import React, {useEffect, useState} from "react";
import LoaderIndicatorSM from "../LoaderIndicator/LoaderIndicatorSM";
import {capitalizeStr} from "../../utils/str/str";
import {routes} from "../../utils/constants";
import {Link} from "react-router-dom";
import {IAuthorsData} from "../NewsPost/NewsPost.types";

const NewsCard = ({
                      post
                  }: any) => {
    const [authorsData, setAuthorsData] = useState<IAuthorsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const x = async () => setAuthorsData(await getAuthorsData(post.userId));
        x();
    }, []);

    const getAuthorsData = async (id: any) => {
        await setIsLoading(true);
        let res;
        try {
            res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            res = await res.json();
        } catch (e) {
            if (typeof e === "string") {
                throw new Error(e);
            }
            if (e instanceof Error) {
                throw e;
            }
        }
        await setIsLoading(false);
        return res;
    }

    return (
        <Link to={routes.newsPost.path + '/' + post.id} className="card h-100 text-decoration-none text-black">

            {isLoading && authorsData !== null && authorsData !== undefined
                ?
                <LoaderIndicatorSM/>
                :
                authorsData!.name !== null || authorsData!.name !== undefined
                    ?
                    <div className="card-header">
                        {authorsData!.name}
                    </div>
                    :
                    <></>
            }

            <div className="card-body">

                <h5 className="card-title">{capitalizeStr(post.title)}</h5>

                <p className="card-text">{capitalizeStr(post.body.slice(0, 20))}...</p>
            </div>
        </Link>
    );
};

export default NewsCard;