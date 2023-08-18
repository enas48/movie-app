import React, { useEffect, useState } from 'react'
import * as MovieApi from '../api/MovieApi'
import SidebarLayout from '../components/sidebarLayout'
import Loading from '../uiElements/preloading'
import { useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { FaPlay } from 'react-icons/fa'
import MovieList from '../components/MovieList'
import {
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdLanguage
} from 'react-icons/md'
import { BiTimeFive } from 'react-icons/bi'
import RegisterModal from '../uiElements/RegisterModal'

function MovieDetails (props) {
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const [details, setDetails] = useState({})
  const [image, setImage] = useState(null)
  const [video, setvideo] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleBookmark = (e, id,type) => {
    e.stopPropagation()
    props.addBookMark(id,type)
  }

  const fetchMovieVideo = async id => {
    setIsLoading(true)
    try {
      MovieApi.getMovieVideo(id).then(movie => {
        let firstKey = Object.keys(movie.results)[0]
        let link = movie.results[firstKey]
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
          setDetails(movie)
        })
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        console.log(err)
      }
    }

    if (id) {
      fetchMovie(id)
      fetchMovieVideo(id)
    }
  }, [id])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
      <RegisterModal show={props.show} onLogin={props.onLogin} handleCloseModal={props.handleClose}/>  
      {details?.id &&
        <div className='details-container'>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className=' details-bg details-content d-flex flex-column gap-2'
          >
            <span>
            &bull;&nbsp;
              {details?.release_date &&
                new Date(details.release_date).getFullYear()}
            </span>
            <h1>{details?.title}</h1>

            <div className='d-flex gap-1 flex-wrap'>
              {details?.genres &&
                details.genres.length !== 0 &&
                details.genres.map((item, i) => {
                  return (
                    <span
                      key={item.id}
                      className={
                        i === details.genres.length - 1
                          ? 'px-2'
                          : 'border-end pe-2'
                      }
                    >
                      {item.name}
                    </span>
                  )
                })}
            </div>
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
            <p className='col-md-8 col-lg-6'>{details?.overview}</p>
            <div className='d-flex gap-4 mb-4 flex-wrap'>
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
            
            </div>
            <div className='d-flex gap-2'>
              <button
                disabled={disabled}
                className='btn icon-container'
                onClick={e => handlePlay(details.id)}
              >
                Watch Now&nbsp;
                <FaPlay />
              </button>
              <button
                onClick={e => handleBookmark(e, details.id,'movie')}
                className=' btn icon-container bookmark'
              >
                Add to Bookmark&nbsp;
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
          <div className='details-related-content'>
            <MovieList
              bookmarkedIds={props.bookmarkedIds}
              addBookMark={props.addBookMark}
              kind='similar'
              id={id}
            />
          </div>
        </div>
}
      </SidebarLayout>
    </>
  )
}

export default MovieDetails
