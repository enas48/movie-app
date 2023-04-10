import React,{useEffect} from "react";
import './leftSidebar.css';

import ListGroup from 'react-bootstrap/ListGroup';
function LeftSidebar(props) {
 
    return ( 
        <div className="left-sidebar">
                <ListGroup >
      <ListGroup.Item >Home</ListGroup.Item>
      <ListGroup.Item >login</ListGroup.Item>
      <ListGroup.Item >signup</ListGroup.Item>
      <ListGroup.Item >logout</ListGroup.Item>

    </ListGroup>
        

 </div>
    );
}

export default LeftSidebar;