import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Button, Container, Image} from "react-bootstrap";
import {RootContext} from "../contexts/root-context";
import avatarPlaceholder from "../assets/img/personalisation/avatar-placeholder.png";

//todo: add editiing of personal data, add 'quit' button, add profile image and edit function for it

const Profile = () => {
    const { authUserState: { username, image, email, password, onLogout} } = useContext(RootContext);
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

    let avatar = avatarPlaceholder;
    useEffect(() => {
        avatar = image == '' ? avatarPlaceholder : image;
    }, [image, avatarPlaceholder]);


    return (
        <Container>
            <h4>Profile</h4>
            {isLoading ? "Data is loading..." : (
                <Fragment>
                    <Image
                        src={avatar}
                        alt="Profile's avatar"
                        roundedCircle
                        style={{
                            width: '128px',
                            height: '128px',
                        }}
                    />
                    <h2>{username}</h2>
                    <p>email: {email}</p>
                    <p>username: {username}</p>
                    <p>password: ***</p>
                    <Button>Logout</Button>
                </Fragment>
            )}
        </Container>
    );
};

export default Profile;
