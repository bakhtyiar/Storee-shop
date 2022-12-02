import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {getUser} from "../utils/methods";
import {RootContext} from "../contexts/root-context";
import {useNavigate, useParams} from "react-router-dom";
import {routes} from "../utils/constants";

const Profile = () => {
    const { authUserState: { username, image, email, password } } = useContext(RootContext);
    const [isLoading, setIsLoading] = useState(false);

    // The original idea. Not realized due to api restrictions
    // const navigate = useNavigate();
    // const { authUserState: { isLoggedIn, id: userID } } = useContext(RootContext);
    // const [data, setData] = useState(null);
    // const { id } = useParams();
    // useEffect(() => {
    //     if (!(isLoggedIn && userID == id)) {
    //         navigate(routes.home.path);
    //         return ;
    //     }
    //     setIsLoading(true);
    //     getUser(id)
    //         .then(result => setData(result))
    //         .finally(() => setIsLoading(false));
    // }, []);

    return (
        <Container>
            <h4>Profile</h4>
            {isLoading ? "Data is loading..." : (
                <Fragment>
                    <h2>{username}</h2>
                    <p>email: {email}</p>
                    <p>username: {username}</p>
                    <p>password: ***</p>
                </Fragment>
            )}
        </Container>
    );
};

export default Profile;
