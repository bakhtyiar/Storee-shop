import React from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {routes} from '../utils/constants';
import styled from 'styled-components';
import logo from '../materials/img/logotype/icons8-icons8.svg'
import RegisterModal from "./registerModal";
import LoginModal from "./loginModal";

const StyledImg = styled.img`
  height: 44px;
  width: 44px;
`;

const Header = (authUser) => {
    const [loginModalShow, setLoginModalShow] = React.useState(false);
    const [regModalShow, setRegModalShow] = React.useState(false);

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to={routes.home.path}>
                    <StyledImg
                        alt="Logotype"
                        src={logo}
                        className="d-inline-block align-top"
                    />{' '}
                    Storee
                </Navbar.Brand>
                <Nav>
                    <Nav.Link as={NavLink} to={routes.home.path} end>Home</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.products.path}>Products</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.news.path}>News</Nav.Link>
                    {authUser.isAuth ?
                        <Nav.Link as={NavLink} to={routes.user.path + "/:" + authUser.id}>Profile</Nav.Link>
                        : (
                            <>
                                <Nav.Link onClick={() => setRegModalShow(true)}>Register</Nav.Link>
                                <Button onClick={() => setLoginModalShow(true)}>Login</Button>
                            </>
                        )}
                </Nav>
            </Container>
            <RegisterModal show={regModalShow} onHide={() => setRegModalShow(false)}/>
            <LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)}/>
        </Navbar>
    );
}

export default Header;
