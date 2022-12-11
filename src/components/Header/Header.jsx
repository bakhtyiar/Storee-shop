import React, {useContext, useState} from 'react';
import {Button, Container, Nav, Navbar, Offcanvas} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {routes} from '../../utils/constants';
import styled from 'styled-components';
import logo from '../../assets/img/logotype/icons8-icons8.svg'
import AuthModal from "../AuthModal/AuthModal";
import {RootContext} from "../../contexts/root-context";
import {AuthModalContext} from "../../contexts/authModal-context";

const StyledImg = styled.img`
  height: 44px;
  width: 44px;
`;

const Header = () => {
    const {
        authUserState: {isLoggedIn, id},
        cartState: {products}
    } = useContext(RootContext);

    const {onRegister, onLogin, onHide, isShow} = useContext(AuthModalContext);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to={routes.home.path} className='d-flex align-items-center'>
                    <StyledImg
                        alt="Logotype"
                        src={logo}
                        className="d-inline-block align-top"
                    />{' '}
                    <span className='align-self-center mb-1 ms-2'>Storee</span>
                </Navbar.Brand>
                <Nav>
                    <Nav.Link as={NavLink} to={`${routes.cart.path}/${isLoggedIn ? id : ''}`}
                              variant='outline-light' className='d-sm-none d-block mx-2'>
                        <i className="bi bi-bag me-2"></i>
                        {' '}
                        Cart {products.length > 0 ? `(${products.length})` : ''}
                    </Nav.Link>
                    <Button variant="outline-light" onClick={handleShow} className="d-sm-none d-block me-6">
                        ☰ Menu
                    </Button>
                </Nav>
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
                                        <Button variant='outline-secondary'
                                                className='my-2'
                                                onClick={() => onRegister()}
                                        >
                                            Register
                                        </Button>
                                        <Button
                                            onClick={() => onLogin()}
                                        >
                                            Login
                                        </Button>
                                    </>
                                )}
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
                <Nav className='d-none d-sm-flex me-auto'>
                    <Nav.Link as={NavLink} to={routes.home.path} end>Home</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.products.path}>Products</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.news.path}>News</Nav.Link>
                </Nav>
                <Nav className='d-none d-sm-flex me-none'>
                    <Nav.Link
                        as={NavLink}
                        to={`${routes.cart.path}/${isLoggedIn ? id : ''}`}
                        variant='outline-light'
                        className='mx-2'
                    >
                        <i className="bi bi-bag me-2"></i>
                        {' '}
                        Cart {products.length > 0 ? `(${products.length})` : ''}
                    </Nav.Link>
                    {isLoggedIn ?
                        <Nav.Link as={NavLink} to={`${routes.user.path}/${id}`}>Profile</Nav.Link>
                        : (
                            <>
                                <Button variant='outline-light'
                                        className='mx-2'
                                        onClick={() => onRegister()}
                                >
                                    Register
                                </Button>
                                <Button
                                    variant='primary'
                                    onClick={() => onLogin()}
                                >
                                    Login
                                </Button>
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
