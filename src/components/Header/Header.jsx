import React, {useContext, useState} from 'react';
import {Button, Container, Nav, Navbar, Offcanvas} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {routes} from '../../utils/constants';
import styled from 'styled-components';
import logo from '../../assets/img/logotype/icons8-icons8.svg'
import AuthModal from "../AuthModal/AuthModal";
import {RootContext} from "../../contexts/root-context";

const StyledImg = styled.img`
  height: 44px;
  width: 44px;
`;

const Header = () => {
    const {
        authModalState: {onRegister, onLogin, onHide, isShow},
        authUserState: {isLoggedIn, id}
    } = useContext(RootContext);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to={routes.home.path}>
                    <StyledImg
                        alt="Logotype"
                        src={logo}
                        className="d-inline-block align-top"
                    />{' '}
                    <span className='align-middle'>Storee</span>
                </Navbar.Brand>
                <Button variant="outline-light" onClick={handleShow} className="d-sm-none d-block me-6">
                    ☰ Menu
                </Button>
                <Offcanvas show={show} onHide={handleClose} placement='end'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav>
                            <Nav.Link as={NavLink} to={routes.home.path} end>Home</Nav.Link>
                            <Nav.Link as={NavLink} to={routes.products.path}>Products</Nav.Link>
                            <Nav.Link as={NavLink} to={routes.news.path}>News</Nav.Link>
                            {isLoggedIn ?
                                <Nav.Link as={NavLink} to={routes.user.path + "/:" + id}>Profile</Nav.Link>
                                : (
                                    <>
                                        <Nav.Link onClick={() => onRegister()}>Register</Nav.Link>
                                        <Button onClick={() => onLogin()}>Login</Button>
                                    </>
                                )}
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
                <Nav className='d-none d-sm-flex'>
                    <Nav.Link as={NavLink} to={routes.home.path} end>Home</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.products.path}>Products</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.news.path}>News</Nav.Link>
                    {isLoggedIn ?
                        <Nav.Link as={NavLink} to={routes.user.path + "/:" + id}>Profile</Nav.Link>
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
