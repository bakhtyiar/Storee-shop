import React, {useEffect, useState} from "react";
import LoaderIndicatorSM from "../LoaderIndicator/LoaderIndicatorSM";
import {capitalizeStr} from "../../utils/str/str";
import {routes} from "../../utils/constants";
import {Link} from "react-router-dom";

const NewsCard = ({post}) => {
    const [authorsData, setAuthorsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAuthorsData(post.userId);
    }, []);

    const getAuthorsData = (id) => {
        setIsLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => response.json())
            .then(data => setAuthorsData(data))
            .finally(() => setIsLoading(false));
    }

    return (
        <Link to={routes.newsPost.path + '/' + post.id} className="card h-100 text-decoration-none text-black">
            {isLoading ? <LoaderIndicatorSM/> : <div className="card-header">
                {authorsData.name}
            </div>}
            <div className="card-body">
                <h5 className="card-title">{capitalizeStr(post.title)}</h5>
                <p className="card-text">{capitalizeStr(post.body.slice(0, 20))}...</p>
            </div>
        </Link>
    );
};

export default NewsCard;