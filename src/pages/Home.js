import React,{useEffect} from "react";
import '../index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as MovieApi from '../MovieApi';
import Header from "../components/Header";
function Home(props) {
    useEffect(() => {
       MovieApi.popularMovies().then(movie=>{
        console.log(movie)
       })
      },[])
    return ( 
        <>
        <Header/>
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col >
                home
                </Col>
            </Row>
        </Container>
 </>
    );
}

export default Home;