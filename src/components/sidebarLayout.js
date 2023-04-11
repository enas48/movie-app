import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { RiMovie2Fill } from 'react-icons/ri'
import LeftSidebar from "../components/leftSidebar";
import './sidebarLayout.css';
import {AiOutlineMenu} from 'react-icons/ai';
import { Button } from "react-bootstrap";

function SidebarLayout(props) {
    const [active,setActive]=useState(false);
const toggle=()=>{
setActive(!active)

}
    return (
        <>
            <div className="d-flex content-container">
                <LeftSidebar active={active} />
                <div className="content">{props.children}</div>
                <Nav
                    className="me-auto my-2 my-lg-0 d-flex  mob-nav"
                    navbarScroll
                >
                    <LinkContainer to="/">
                        <Nav.Link className="navbar-brand   mb-3"><RiMovie2Fill className="movie-icon" />Movie</Nav.Link>
                    </LinkContainer>
                <Button className="toggler-icon" variant="" onClick={toggle}><AiOutlineMenu/></Button>

                </Nav>
            </div>
        </>
    );
}

export default SidebarLayout;