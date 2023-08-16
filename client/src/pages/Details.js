import React, { useEffect, useState } from 'react'
import * as MovieApi from '../api/MovieApi'
import SidebarLayout from '../components/sidebarLayout'
import Loading from '../uiElements/preloading'
import { Navigate, useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { FaPlay } from 'react-icons/fa'
import MovieListKind from '../components/MovieListKind'
import {
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdLanguage
} from 'react-icons/md'
import { BiTimeFive } from 'react-icons/bi'

function Details (props) {
  const [isLoading, setIsLoading] = useState(true)
  const { id, type } = useParams()
  const [details, setDetails] = useState({})
  const [image, setImage] = useState(null)
  const [video, setvideo] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleBookmark = (e, id) => {
    e.stopPropagation()
    props.addBookMark(id)
  }

  const fetchMovieVideo = async id => {
    setIsLoading(true)
    try {
      MovieApi.getMovieVideo(id).then(movie => {
        let link
        for (const key in movie.results) {
          let firstKey = Object.keys(movie.results)[0]
          link = movie.results[firstKey]
        }
        setDisabled(true)
        if (link) {
          setvideo(link.link)
          setDisabled(false)
        }
      })
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.log(err)
    }
  }

  const handlePlay = id => {
    // e.stopPropagation();
    fetchMovieVideo(id)
    window.location.replace(video)
  }

  useEffect(() => {
    
    let preloadImages = async movie => {
      if (movie?.backdrop_path && movie.backdrop_path !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
        )
        const image = await response
        if (image.url) setImage(image.url)
      }
    }
    const fetchMovie = async id => {
      setIsLoading(true)

      try {
        MovieApi.getMovieDetails(id).then(movie => {
          preloadImages(movie)
          console.log(movie)
          setDetails(movie)
        })
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        console.log(err)
      }
    }

    const fetchSeries = async id => {
      setIsLoading(true)
      try {
        MovieApi.getSeriesDetails(id).then(series => {
          console.log(series)
          preloadImages(series)
          setDetails(series)
        })
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        console.log(err)
      }
    }
    if (type === 'movies' && id) {
      fetchMovie(id)
      fetchMovieVideo(id)
    }
    if (type === 'series' && id) {
      fetchSeries(id)
    }
  }, [id])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <div className='details-container'>
          <div className='overlay'></div>
          <div
            className='details-bg'
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className='details-content p-3 col-md-6 d-flex flex-column gap-2'>
            <span>
              {details?.release_date &&
                new Date(details.release_date).getFullYear()}
            </span>
            <h1>{details?.title}</h1>

            <div className='d-flex gap-1 flex-wrap'>
              {details?.genres &&
                details.genres.length !== 0 &&
                details.genres.map((item, i) => {
                  return (
                    <p
                      key={item.id}
                      className={
                        i === details.genres.length - 1
                          ? 'px-2'
                          : 'border-end px-2'
                      }
                    >
                      {item.name}
                    </p>
                  )
                })}
            </div>
            <p className=''>{details?.overview}</p>
            <div className='d-flex gap-4 mb-3'>
              <span className='d-flex gap-2 align-items-center'>
                <BiTimeFive />
                <span>{details?.runtime} min</span>
              </span>

              <span className='d-flex gap-2 align-items-center'>
                <MdLanguage />
                <span>
                  {details?.spoken_languages &&
                    details.spoken_languages[0].english_name}
                </span>
              </span>
              <div className='d-flex gap-2 align-items-center mb-1'>
                <StarRating
                  rate={
                    details?.vote_average && details.vote_average.toFixed(1)
                  }
                />
                <span>
                  {details?.vote_average && details.vote_average.toFixed(1)}/10
                </span>
              </div>
            </div>
            <div className='d-flex gap-2'>
              <button
                disabled={disabled}
                className='btn icon-container'
                onClick={e => handlePlay(details.id)}
              >
                <FaPlay />
              </button>
              <button
                onClick={e => handleBookmark(e, details.id)}
                className=' btn icon-container bookmark'
              >
                {props.bookmarkedIds.includes(
                  details.id && details.id.toString()
                ) ? (
                  <MdOutlineBookmark className='bookmark_icon' />
                ) : (
                  <MdOutlineBookmarkBorder className='bookmark_icon' />
                )}
              </button>
            </div>
          </div>
          <MovieListKind
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind='similar'
            id={id}
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default Details
