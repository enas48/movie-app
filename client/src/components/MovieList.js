import React, { useEffect, useState } from 'react'
// import Carousel from "react-grid-carousel";
import Slider from 'react-slick'
import * as MovieApi from '../api/MovieApi'

import Loading from './uiElements/preloading'
import CarouselItem from './CarouselItem'
import { LinkContainer } from 'react-router-bootstrap'

function MovieList (props) {
  let {
    kind,
    id,
    addBookMark,
    bookmarkedIds,
    favouriteIds,
    addFavourite,
    cols,
    clearVideoKey
  } = props
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: cols,
    slidesToScroll: cols,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: cols,
          slidesToScroll: cols,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
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

  const loadData = async () => {
    if (kind === 'trending') {
      setIsLoading(true)
      MovieApi.trendingMovies().then(movie => {
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
          setIsLoading(false)
        })
      })
    }
    if (kind === 'topRated') {
      setIsLoading(true)
      MovieApi.topRatedMovies().then(movie => {
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
          setIsLoading(false)
        })
      })
    }
    if (kind === 'upcoming') {
      setIsLoading(true)
      MovieApi.upcomingMovies().then(movie => {
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
          setIsLoading(false)
        })
      })
    }
    if (kind === 'similar') {
      MovieApi.similarMovie(id).then(movie => {
        setIsLoading(true)
        MovieApi.list(movie.results).then(data => {
          setMovies(data.slice(0, 20))
          setIsLoading(false)
        })
      })
    }
  }

  useEffect(() => {
    loadData()
  }, [kind, id])

  return (
    <div className='list'>
      {movies.length !== 0 && (
        <>
          <div className='d-flex align-items-start justify-content-between'>
            <h3 className='px-md-4 mb-4'>
              {kind === 'trending' && 'Trending movies'}
              {kind === 'topRated' && 'Top rated movies'}
              {kind === 'upcoming' && 'Upcoming movies'}
              {kind === 'similar' && 'Related Movies'}
            </h3>
            {kind !== 'similar' && (
              <LinkContainer to={`/allmovies/${kind}`}>
                <button className='btn custom-btn'>View more</button>
              </LinkContainer>
            )}
          </div>
          {isLoading ? (
            <Loading content={true} />
          ) : (
            <div className='col-11 mx-auto mb-4 movieList'>
              <Slider {...settings}>
                {movies.length !== 0 &&
                  movies.map((item, i) => {
                    return (
                      <CarouselItem
                        key={i}
                        link={`/details/movies/${item.id}`}
                        type='movie'
                        item={item}
                        addBookMark={addBookMark}
                        bookmarkedIds={bookmarkedIds}
                        favouriteIds={favouriteIds}
                        addFavourite={addFavourite}
                        clearVideoKey={clearVideoKey}
                      />
                    )
                  })}
              </Slider>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MovieList
