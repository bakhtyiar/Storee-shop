import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {routes} from '../utils/constants';
import styled from 'styled-components';
import logo from '../assets/img/logotype/icons8-icons8.svg'
import AuthModal from "./authModal";
import {RootContext} from "../contexts/root-context";

const StyledImg = styled.img`
  height: 44px;
  width: 44px;
`;

const Header = (authUser) => {
    const {authModalState: {onRegister, onLogin, onHide, isShow } } = useContext(RootContext);

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
                                <Nav.Link onClick={() => onRegister()}>Register</Nav.Link>
                                <Button onClick={() => onLogin()}>Login</Button>
                            </>
                        )}
                </Nav>
            </Container>
            <AuthModal
                show={isShow}
                onHide={onHide}
            />
        </Navbar>
    );
}

export default Header;
