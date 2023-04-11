import React,{useEffect} from "react";
import './leftSidebar.css';
import Form from 'react-bootstrap/Form';

function Searrch(props) {
 
    return ( 
        <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search for Movies"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-light"><FiSearch/></Button>
      </Form>
    );
}

export default Searrch;