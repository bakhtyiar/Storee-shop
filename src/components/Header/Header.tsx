import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar, Offcanvas} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {routes} from '../../utils/constants';
import styled from 'styled-components';
import logo from '../../assets/img/logotype/letter-s64.png'
import AuthModal from "../AuthModal/AuthModal";
import {RootContext} from "../../contexts/root-context/root-context";
import {AuthModalContext} from "../../contexts/authModal-context/authModal-context";
import {BurgerMenuContext} from "../../contexts/burgerMenu-context/burgerMenu-context";

const StyledImg = styled.img`
  height: 44px;
  width: 44px;
`;
//todo: write test, fix router or smth bugs when trying to render
const Header = () => {
    const {
        authUserState: {isLoggedIn},
        cartState: {totalQuantity},
        themeState: {theme}
    } = useContext(RootContext);

    const {onRegister, onLogin, onHide, isShow} = useContext(AuthModalContext);
    const {isShow: isShowBurgerMenu, onShow: showBurgerMenu, onHide: hideBurgerMenu} = useContext(BurgerMenuContext);

    return (
        <Navbar sticky="top" style={{
            'backdropFilter': 'blur(2px)',
            'backgroundColor': theme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)'
        }}>
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
                    <Nav.Link as={NavLink} to={`${routes.cart.path}`} className='d-md-none d-block mx-2 text-center'>
                        <i className="bi bi-bag me-2"></i>
                        {' '}
                        Cart <span data-testid='cart-products-count'>{totalQuantity > 0 ? totalQuantity : ''}</span>
                    </Nav.Link>
                    <Button variant="outline-light" onClick={showBurgerMenu} className="d-md-none d-block me-6" data-testid='menu-btn-mobile'>
                        ☰ Menu
                    </Button>
                </Nav>
                <Offcanvas show={isShowBurgerMenu} onHide={hideBurgerMenu} placement='end'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav>
                            <Nav.Link as={NavLink} to={routes.home.path} end>Home</Nav.Link>
                            <Nav.Link as={NavLink} to={routes.products.path}>Products</Nav.Link>
                            <Nav.Link as={NavLink} to={routes.news.path}>News</Nav.Link>
                            {isLoggedIn &&
                                <Nav.Link as={NavLink} to={routes.profile.path}>Profile</Nav.Link>
                            }
                            {!isLoggedIn &&
                                <>
                                    <Button variant='outline-secondary'
                                            className='my-2'
                                            onClick={() => onRegister()}
                                            data-testid='register-btn-mobile'
                                    >
                                        Register
                                    </Button>
                                    <Button
                                        onClick={() => onLogin()}
                                        data-testid='login-btn-mobile'
                                    >
                                        Login
                                    </Button>
                                </>
                            }
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
                <Nav className='d-none d-md-flex me-auto'>
                    <Nav.Link as={NavLink} to={routes.home.path} end>Home</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.products.path}>Products</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.news.path}>News</Nav.Link>
                </Nav>
                <Nav className='d-none d-md-flex me-none'>
                    <Nav.Link
                        as={NavLink}
                        to={`${routes.cart.path}`}
                        className='mx-2'
                    >
                        <i className="bi bi-bag me-2"></i>
                        {' '}
                        Cart <span data-testid='cart-products-count'>{totalQuantity > 0 ? totalQuantity : ''}</span>
                    </Nav.Link>
                    {isLoggedIn &&
                        <Nav.Link as={NavLink} to={`${routes.profile.path}`}>Profile</Nav.Link>
                    }
                    {!isLoggedIn &&
                        <>
                            <Button variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                                    className='mx-2'
                                    onClick={() => onRegister()}
                                    data-testid='register-btn-desktop'
                            >
                                Register
                            </Button>
                            <Button
                                variant='primary'
                                onClick={() => onLogin()}
                                data-testid='login-btn-desktop'
                            >
                                Login
                            </Button>
                        </>
                    }
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
