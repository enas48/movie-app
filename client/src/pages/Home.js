import React, { useEffect, useState ,useMemo} from "react";
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
         
            for (let data of results) {
                let poster=''
                MovieApi.getImage(data.id).then(movie=>{
               
                    if(movie?.backdrops[0] &&movie?.backdrops[0]!==null){
                    poster= `http://image.tmdb.org/t/p/original${movie.backdrops[0].file_path}`;
                  
                    imageArr.push({ id: data.id, image: poster, caption: data.original_title })
                       }
                })
                // if(data?.poster_path && data.poster_path!==null){
                // const response = await fetch(`https://image.tmdb.org/t/p/w500/${data.poster_path}`)
                // const image = await response
                // if(image?.url){
                //     if(data?.id !== 615 && data?.id !== 1023313 && data?.id !== 943822  && data?.id !== 677179 &&data?.id!==758323){
                // imageArr.push({ id: data.id, image: image.url, caption: data.original_title })
                //     }
                //  } }
                }
        
            setImages(imageArr)
            await new Promise(r => setTimeout(r, 800))
            // Toggle loading state
            setIsLoading(loading => !loading)
            // setIsLoading(false);
        }
        
        MovieApi.popularMovies().then(movie => {
            preloadImages(movie.results)
        })

    }, [imageArr])
    return (
        <>
              {isLoading && <Loading />}
   
        <div className="home">
            <Header />
          
        <div style={{
          padding: "0"
        }}>
            {images.length!==0&&
          <Carousel
            data={images}
            time={2000}
            width="100vw"
            height="calc(100vh - 64px)"
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
            thumbnailWidth="200px"
            style={{
              textAlign: "center",
              maxWidth: "100vw",
              maxHeight: "calc(100vh - 64px)",
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