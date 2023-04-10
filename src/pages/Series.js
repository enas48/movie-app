import React,{useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as MovieApi from '../api/MovieApi';
import Header from "../components/Header";
function Series(props) {
 
    return ( 
        <>
        <Header/>
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col >
                Series
                </Col>
            </Row>
        </Container>
 </>
    );
}

export default Series;