import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as MovieApi from '../MovieApi';
import Header from "../components/Header";
import { Carousel } from 'react-carousel-minimal';
function Home(props) {
    const [images, setImages] = useState([]);
    let imageArr = [];
    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }

    useEffect(() => {
        let preloadImages = async (results) => {
            for (let data of results) {
                const response = await fetch(`https://image.tmdb.org/t/p/w500/${data.poster_path}`)
                const image = await response
                imageArr.push({ id: data.id, image: image.url, caption: data.original_title })
            }

            setImages(imageArr)
        }
        MovieApi.popularMovies().then(movie => {
            console.log(movie);
            preloadImages(movie.results)
        })

    }, [])
    return (
        <>
            <Header />
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col >
        <div style={{
          padding: "0 20px"
        }}>
            {images.length!==0&&
          <Carousel
            data={images}
            time={5000}
            width="100vw"
            height="70vh"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={false}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "100vw",
              maxHeight: "70vh",
              margin: "40px auto",
            }}
          />
        }
        </div>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;