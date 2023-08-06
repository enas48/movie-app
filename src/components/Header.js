import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { RiMovie2Fill } from 'react-icons/ri'

function Header() {
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container >
        <LinkContainer to="/">
          <Navbar.Brand><RiMovie2Fill className="movie-icon" />Movie</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
      
            navbarScroll
          >

            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/movies">
              <Nav.Link>Movies</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/series">
              <Nav.Link>Series</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/bookmark">
              <Nav.Link>Bookmark</Nav.Link>
            </LinkContainer>

          </Nav>
       
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header
