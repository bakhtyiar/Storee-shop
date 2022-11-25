import React, {Fragment, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getUser} from "../utils/methods";

const Profile = (authUser) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (authUser.isAuth) {
            setData(authUser)
            setIsLoading(false);
            return ;
        }
        setIsLoading(true);
        getUser(id)
            .then(result => setData(result))
            .then(() => {
                authUser.isAuth = true;
                authUser.id = data.id;
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <Container>
            <h1>Profile</h1>
            {isLoading ? "Data is loading..." : (
                <Fragment>
                    <h2>{data['firstName']} {data['lastName']} {data['maidenName']}</h2>
                    <p>email: {data['email']}</p>
                    <p>phone: {data['phone']}</p>
                    <p>username: {data['username']}</p>
                    <p>password: ***</p>
                </Fragment>
            )}
        </Container>
    );
};

export default Profile;
