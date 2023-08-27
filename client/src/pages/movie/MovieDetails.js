import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import * as MovieApi from '../../api/MovieApi'

import SidebarLayout from '../../components/sidebarLayout'
import StarRating from '../../components/StarRating'
import MovieList from '../../components/MovieList'
import Crew from '../../components/Crew'
import Search from '../../components/search'
import Loading from '../../uiElements/preloading'
import RegisterModal from '../../uiElements/RegisterModal'
import BookmarkFavBtn from '../../components/BookmarkFavBtn'

import { FaPlay } from 'react-icons/fa'
import { MdLanguage } from 'react-icons/md'
import { BiTimeFive, BiCameraMovie } from 'react-icons/bi'

function MovieDetails ({
  addBookMark,
  bookmarkedIds,
  favouriteIds,
  addFavourite,
  handleClose,
  show
}) {
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const [details, setDetails] = useState({})
  const [image, setImage] = useState(null)
  const [video, setvideo] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [key, setKey] = useState(null)

  const handleBookmark = (e, id, type) => {
    e.stopPropagation()
    addBookMark(id, type)
  }
  const handleFavourite = (e, id, type) => {
    e.stopPropagation()
    addFavourite(id, type)
  }
  const handlePlay = id => {
    fetchMovieVideo(id)
    window.open(video, '_blank')
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

  const fetchTrailer = async id => {
    try {
      MovieApi.Trailer(id).then(data => {
        console.log(data.results)
        let youtubeVideos = data.results.filter(d => d.site === 'YouTube')
        console.log(youtubeVideos)
        if (youtubeVideos[0]?.key) {
          setKey(youtubeVideos[0].key)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

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

  useEffect(() => {
    if (id) {
      fetchMovie(id)
      fetchMovieVideo(id)
      fetchTrailer(id)
    }
  }, [id])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <Search />
        <RegisterModal show={show} handleCloseModal={handleClose} />
        {details?.id && (
          <div className='details-container mt-lg-5'>
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
                      details.spoken_languages[0]?.english_name &&
                      details.spoken_languages[0].english_name}
                  </span>
                </span>
                <span className='d-flex gap-2 align-items-center'>
                  <BiCameraMovie /> movie
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
                <BookmarkFavBtn
                  bookmarkedIds={bookmarkedIds}
                  favouriteIds={favouriteIds}
                  addBookMark={handleBookmark}
                  addFavourite={handleFavourite}
                  kind='dropdown'
                  type='movie'
                  item={details}
                />
              </div>
            </div>

            <Crew id={id} type='movie' />

            {key && (
              <div className='details-related-content'>
                <h3 className='mb-4'>Trailer</h3>
                <div className='text-center'>
                  <iframe
                    src={`https://www.youtube.com/embed/${key}`}
                    height='480'
                    width='100%'
                    className='iframe'
                    title='Iframe Example'
                  ></iframe>
                </div>
              </div>
            )}

            <div className='details-related-content'>
              <MovieList
                bookmarkedIds={bookmarkedIds}
                addBookMark={addBookMark}
                favouriteIds={favouriteIds}
                addFavourite={addFavourite}
                kind='similar'
                cols={4}
                id={id}
              />
            </div>
          </div>
        )}
      </SidebarLayout>
    </>
  )
}

export default MovieDetails
