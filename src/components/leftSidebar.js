import React, { useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { RiMovie2Fill } from 'react-icons/ri'
function LeftSidebar(props) {

    return (

        <div className={props.active ? 'active left-sidebar' : 'left-sidebar'}>

            <Nav
                className="me-auto my-2 my-lg-0 d-flex flex-column"

                navbarScroll
            >
                <LinkContainer to="/">
                    <Nav.Link className="navbar-brand sidebar  mb-3"><RiMovie2Fill className="movie-icon" />Movie</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/" className="mt-lg-5 pt-lg-4">
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


        </div>
    );
}

export default LeftSidebar;