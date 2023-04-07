import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useHistory } from "react-router-dom";

function Header() {
    return (
      <Navbar bg="light" expand="lg">
        <Container >
          <LinkContainer to="/">
            <Navbar.Brand>Movie</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
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
              <LinkContainer to="/upcoming">
                <Nav.Link>Upcoming</Nav.Link>
              </LinkContainer>

            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Header
