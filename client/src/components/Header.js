import React , { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { RiMovie2Fill } from 'react-icons/ri'
import {BiLogIn} from 'react-icons/bi'
import {MdPersonAddAlt1 } from 'react-icons/md'

function Header() {
  const [auth, setAuth] = useState(false)
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
          <Nav
            className="ms-auto my-2 my-lg-0"
      
            navbarScroll
          >
            {auth ? (
          <LinkContainer to='/profile'>
            <Nav.Link>
              <img
                src={process.env.PUBLIC_URL + './4.png'}
                className='avater'
                alt=''
              />
            </Nav.Link>
          </LinkContainer>
        ) : (
          <span className='d-flex align-items-center'>
            <LinkContainer to='/login'>
              <Nav.Link>            
              <span className='d-flex align-items-center gap-2'>
                 <BiLogIn/>
              <span className='icon-text'>Login</span>
              </span>
               </Nav.Link>
            </LinkContainer>
            <span>|</span>
            <LinkContainer to='/register'>
              <Nav.Link>        <span className='d-flex align-items-center gap-2'>
                 <MdPersonAddAlt1/>
              <span className='icon-text'>Signup</span>
              </span> </Nav.Link>
            </LinkContainer>
          </span>
        )}  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header
