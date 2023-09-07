import React, { useEffect, useState, useMemo, useContext, useRef } from 'react'
import { Carousel } from 'react-carousel-minimal'
import { Link as LinkRouter } from 'react-router-dom'
import * as MovieApi from '../api/MovieApi'
import MovieList from '../components/MovieList'
import TvList from '../components/TVList'
import Header from '../components/Header'
import Loading from '../uiElements/preloading'
import { PiTelevision } from 'react-icons/pi'
import RegisterModal from '../uiElements/RegisterModal'
import AuthContext from '../helpers/authContext'
import Slider from 'react-slick'

function Home (props) {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])
  const [posters, setPosters] = useState([])
  const { userId } = useContext(AuthContext)


  let imageArr = useMemo(() => [], [])
  let posterArr = useMemo(() => [], [])
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold'
  }

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // customPaging: function (i) {
    //   const x = posters.map((item, i) => {
    //     return (
    //       <a
          
    //       >
    //         <img src={`${item.image}`} alt='' />
    //       </a>
    //     )
    //   })

    //   return x[i]
    // },
    autoplay: true
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
        if (movie?.posters[0] && movie?.posters[0] !== null) {
          poster = `http://image.tmdb.org/t/p/original${movie.posters[0].file_path}`
          posterArr.push({
            id: data.id,
            image: poster,
            caption: data.original_title
          })
        }
      })
    }
    setImages(imageArr)
    setPosters(posterArr)
    // await new Promise(r => setTimeout(r, 2000))
    setIsLoading(false)
  }

  useEffect(() => {

    MovieApi.popularMovies().then(movie => {
      preloadImages(movie.results)
    })
  }, [imageArr, posterArr])

  return (
    <>
      {isLoading && <Loading />}
      <RegisterModal show={props.show} handleCloseModal={props.handleClose} />

      <div className='home'>
        <Header />
        <div className='p-0 mb-5'>
          {images.length !== 0 && (
            <>
              <Slider {...settings} className='carsoul'>
                {images.map(item => (
                  <div key={item.id} className='carsoul-item'>
                    <h3>{item?.caption}</h3>
                    <img src={item?.image} alt={item.caption} />
                    <div className='overlay'></div>
                  </div>
                ))}
              </Slider>
              {/* <Carousel
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
            /> */}
            </>
          )}
        </div>
        <div className='container py-5'>
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind='trending'
            cols={4}
          />
          <br />
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind='topRated'
            cols={4}
          />
        </div>
        {!userId && (
          <div className='create-account'>
            <div className='row align-items-center'>
              <div className='col-md-6 text-center'>
                <PiTelevision className='display-1' />
              </div>
              <div className='col-md-6 text-center'>
                <h2 className='mb-4 h-3'>
                  See New and recently added <br /> movies and TV shows
                </h2>
                <LinkRouter to='/register' className='custom-btn py-2 h5'>
                  <span> Create Account</span>
                </LinkRouter>
              </div>
            </div>
          </div>
        )}
        <div className='container py-5'>
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind='topRated'
            cols={4}
          />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind='onair'
            cols={4}
          />
        </div>
      </div>
    </>
  )
}

export default Home
