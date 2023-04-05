import React,{useState} from "react";
import '../index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function MovieForm(props) {
    const[formData,setFormData]=useState({
        name:"",
        rating:""
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        setFormData({
        name:"",
        rating:""  
        })
        props.onAddmovie(formData)
    }
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
          });
    }
    return ( 
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1>Add movie</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formMovieName">
                            <Form.Label>Movie Name</Form.Label>
                            <Form.Control type="text" required value={formData.name} name="name" onChange={handleChange} placeholder="Enter movie name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formRating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" required value={formData.rating} min="0" max="100" name="rating" onChange={handleChange} placeholder="Rating" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
 
    );
}

export default MovieForm;