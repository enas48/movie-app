import React, { useEffect, useState ,useMemo} from "react";
import MessageModal from "../uiElements/messageModel";
import * as MovieApi from '../api/MovieApi';
import Header from "../components/Header";
import { Carousel } from 'react-carousel-minimal';
import Loading from "../uiElements/preloading";
function Home(props) {
    const [isLoading, setIsLoading] = useState(false);
    // const[error, setError]=useState(null);

    const [images, setImages] = useState([]);
    let imageArr = useMemo(() => [], []);
    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
 
    useEffect(() => {
        let preloadImages = async (results) => {
            setIsLoading(true);
            console.log(results)
            for (let data of results) {
                if(data?.poster_path && data.poster_path!==null){
                const response = await fetch(`https://image.tmdb.org/t/p/w500/${data.poster_path}`)
                const image = await response
                if(image?.url){
                    if(data?.id !== 615 && data?.id !== 1023313 && data?.id !== 943822  && data?.id !== 677179 &&data?.id!==758323){
                imageArr.push({ id: data.id, image: image.url, caption: data.original_title })
                    }
                 } }
                }
         
            setImages(imageArr)
            setIsLoading(false);
        }
        MovieApi.popularMovies().then(movie => {
            preloadImages(movie.results)
        })

    }, [imageArr])
    return (
        <>
             {/* {error && <MessageModal text={error} success={false} />} */}
              {isLoading && <Loading />}
   
        <div className="home">
            <Header />
          
        <div style={{
          padding: "0"
        }}>
            {images.length!==0&&
          <Carousel
            data={images}
            time={2100}
            width="100vw"
            height="92.5vh"
            captionStyle={captionStyle}
            slideNumber={false}
            captionPosition="center"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="185px"
            style={{
              textAlign: "center",
              maxWidth: "100vw",
              maxHeight: "92.5vh",
              margin: "0px auto",
            }}
          />
        }
        </div>

        
        </div>
        </>
    );
}

export default Home;