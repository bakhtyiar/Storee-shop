import React from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {routes} from '../utils/constants';
import styled from 'styled-components';
import logo from '../materials/img/logotype/icons8-icons8.svg'
import AuthModal from "./authModal";

const StyledImg = styled.img`
  height: 44px;
  width: 44px;
`;

const Header = (authUser) => {
    const [modalShow, setModalShow] = React.useState(false);

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
                            <Button as={NavLink} onClick={() => setModalShow(true)}>Login/Register</Button>
                        )}
                </Nav>
            </Container>
            <AuthModal show={modalShow} onHide={() => setModalShow(false)} />
        </Navbar>
    );
}

export default Header;
