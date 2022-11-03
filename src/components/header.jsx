import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { routes } from '../utils/constants';
import styled from 'styled-components';
import logo from '../materials/img/logotype/icons8-icons8.svg'

const StyledImg = styled.img`
  height: 44px;
  width: 44px;
`;

const Header = () => {
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
        </Nav>
        </Container>
      </Navbar>
	);
}

export default Header;
