import React, { useEffect, useState, useMemo } from 'react'
import { Carousel } from 'react-carousel-minimal'

import * as MovieApi from '../api/MovieApi'

import Header from '../components/Header'
import Loading from '../uiElements/preloading'

function Home (props) {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])
  let imageArr = useMemo(() => [], [])
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold'
  }

  let preloadImages = async results => {
    setIsLoading(true)

    for (let data of results) {
      let poster = ''
      MovieApi.getImage(data.id).then(movie => {
        if (movie?.backdrops[0] && movie?.backdrops[0] !== null) {
          poster = `http://image.tmdb.org/t/p/original${movie.backdrops[0].file_path}`
          imageArr.push({
            id: data.id,
            image: poster,
            caption: data.original_title
          })
        }
      })
    }
    setImages(imageArr)
    await new Promise(r => setTimeout(r, 800))
    setIsLoading(loading => !loading)
  }

  useEffect(() => {
    MovieApi.popularMovies().then(movie => {
      preloadImages(movie.results)
    })
  }, [imageArr])

  return (
    <>
      {isLoading && <Loading />}
      <div className='home'>
        <Header />
        <div className='p-0'>
          {images.length !== 0 && (
            <Carousel
              data={images}
              time={2000}
              width='100vw'
              height='calc(100vh - 64px)'
              captionStyle={captionStyle}
              slideNumber={false}
              captionPosition='center'
              automatic={true}
              dots={true}
              pauseIconColor='white'
              pauseIconSize='40px'
              slideBackgroundColor='darkgrey'
              slideImageFit='cover'
              thumbnails={true}
              thumbnailWidth='200px'
              style={{
                textAlign: 'center',
                maxWidth: '100vw',
                maxHeight: 'calc(100vh - 64px)',
                margin: '0px auto'
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Home
