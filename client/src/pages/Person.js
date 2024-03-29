import React, { useEffect, useState } from 'react'
// import Carousel from "react-grid-carousel";
import Slider from 'react-slick'
import { useParams } from 'react-router-dom'
import SidebarLayout from '../components/sidebar/sidebarLayout'
import Loading from '../components/uiElements/preloading'
import CarouselItem from '../components/CarouselItem'
import * as PersonApi from '../api/PersonApi'
import * as MovieApi from '../api/MovieApi'
import * as TvSeriesApi from '../api/TvSeriesApi'
import RegisterModal from '../components/uiElements/RegisterModal'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function Person (props) {
  let { addBookMark, bookmarkedIds, favouriteIds, addFavourite ,watchedIds,addWatched} = props
  const { id } = useParams()
  const [loading, setIsLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,

    responsive: [
    
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 678,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const fetchPerson = async id => {
    try {
      PersonApi.getPerson(id).then(data => {
        PersonApi.getPersonDetails(data).then(data => {
          setPerson(data)
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchMovies = async id => {
    try {
      PersonApi.Movies(id).then(data => {
        MovieApi.list(data.cast).then(data => {
          setMovies(data)
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchSeries = async id => {
    try {
      PersonApi.Series(id).then(data => {
        TvSeriesApi.list(data.cast).then(data => {
          setSeries(data)
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchAll = async () => {
    setIsLoading(true)
    if (id) {
      await Promise.all([fetchPerson(id), fetchMovies(id), fetchSeries(id)])
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchAll()
  }, [id])

  return (
    <>
      {loading && <Loading />}
      <SidebarLayout>
        <RegisterModal show={props.show} handleCloseModal={props.handleClose} />
        <div className='details-container person-container'>
          <div className=' details-content container row m-auto d-flex justify-content-center'>
            <div className='col-md-5 col-lg-3 order-md-2 text-center mb-3'>
              {person?.image && (
                <LazyLoadImage
                  className='img-fluid rounded eposide '
                  src={person?.image}
                  alt={person?.name}
                />
              )}
              {person?.image === '' && (
                <LazyLoadImage
                  className='img-fluid rounded eposide '
                  src={process.env.PUBLIC_URL + '../../noimage.png'}
                  alt=''
                />
              )}
            </div>
            <div className='col-md-7 col-lg-9'>
              <div className='d-flex flex-column gap-1'>
                <h1>Profile</h1>
                {person?.title && (
                  <span className='d-flex gap-1'>
                    <span className='text-secondry fw-bold'>Name: </span>
                    <span>{person.title}</span>
                  </span>
                )}

                {person?.birthday && (
                  <span className='d-flex gap-1'>
                    <span className='text-secondry fw-bold'>Birthday: </span>
                    <span className='text-nowrap'>
                      {new Date(person.birthday).getDate()} &nbsp;
                      {month[new Date(person.birthday).getMonth()]}
                      ,&nbsp;
                      {new Date(person.birthday).getFullYear()}
                    </span>
                  </span>
                )}
                {person?.place_of_birth && (
                  <span className='d-flex gap-1'>
                    <span className='text-secondry fw-bold'>BirthPlace: </span>
                    <span>{person.place_of_birth}</span>
                  </span>
                )}
                {person?.known_for_department && (
                  <span className='d-flex gap-1'>
                    <span className='text-secondry fw-bold flex-shrink-0'>
                      Known For:{' '}
                    </span>
                    <span>{person.known_for_department}</span>
                  </span>
                )}
                {person?.also_known_as && person.also_known_as.length !== 0 && (
                  <span className='d-flex gap-1 flex-wrap flex-lg-nowrap'>
                    <span className='text-secondry fw-bold flex-shrink-0'>
                      Also Known As:{' '}
                    </span>
                    <span>
                      {person.also_known_as.map((item, i) => (
                        <span key={i}>
                          {item}
                          {(i === 0 && person.also_known_as.length === 1) ||
                          i === person.also_known_as.length - 1
                            ? ''
                            : ', '}
                        </span>
                      ))}
                    </span>
                  </span>
                )}
                {person?.biography && (
                  <span className='d-flex gap-1 flex-wrap flex-lg-nowrap'>
                    <span className='text-secondry  fw-bold flex-shrink-0'>
                      Biography:{' '}
                    </span>
                    <span>{person.biography}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* movie list */}
        {movies.length !== 0 && (
          <div className='container'>
            <h3 className=' mb-4'>Movies</h3>
            <div className='col-12 mx-auto mb-4 movieList'>
              {/* <Carousel cols={4} rows={1} gap={10} loop autoplay={6000}> */}
              <Slider {...settings}>
                {movies.length !== 0 &&
                  movies.map((item, i) => {
                    return (
                      // <Carousel.Item key={i}>
                      <CarouselItem
                        key={i}
                        link={`/details/movies/${item.id}`}
                        type='movie'
                        item={item}
                        addBookMark={addBookMark}
                        bookmarkedIds={bookmarkedIds}
                        favouriteIds={favouriteIds}
                        addFavourite={addFavourite}
                        watchedIds={watchedIds}
                        addWatched={addWatched}
                        />
                      // </Carousel.Item>
                    )
                  })}
              </Slider>
              {/* </Carousel> */}
            </div>
          </div>
        )}
        {/* tv list */}
        {series.length !== 0 && (
          <div className='seasons-list container'>
            <h3 className=' mb-4'>Drama Series</h3>
            <div className='col-12 mx-auto mb-5 movieList'>
              {/* <Carousel cols={4} rows={1} gap={10} loop autoplay={6000}> */}
              <Slider {...settings}>
                {series.length !== 0 &&
                  series.map((item, i) => {
                    return (
                      // <Carousel.Item key={i}>
                      <CarouselItem
                        key={i}
                        link={`/details/series/${item.id}`}
                        type='tv'
                        item={item}
                        addBookMark={addBookMark}
                        bookmarkedIds={bookmarkedIds}
                        favouriteIds={favouriteIds}
                        addFavourite={addFavourite}
                        watchedIds={watchedIds}
                        addWatched={addWatched}
                      />
                      // </Carousel.Item>
                    )
                  })}
              </Slider>
              {/* </Carousel> */}
            </div>
          </div>
        )}
      </SidebarLayout>
    </>
  )
}

export default Person
