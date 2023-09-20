import React from 'react'

import StarRating from '../../components/StarRating'
import BfwButton from '../../components/bookFavWatch/BfwButton'

import { FaPlay } from 'react-icons/fa'
import { MdLanguage } from 'react-icons/md'
import { BiTimeFive, BiCameraMovie } from 'react-icons/bi'

function MovieDetailsItem ({
  addBookMark,
  bookmarkedIds,
  favouriteIds,
  addFavourite,
  watchedIds,
  addWatched,
  details,
  image,
  handlePlay,
  disabled
}) {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${image})` }}
        className=' details-bg details-content d-flex flex-column gap-2'
      >
        <div className='container'>
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
              rate={details?.vote_average && details.vote_average.toFixed(1)}
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
            <BfwButton
              bookmarkedIds={bookmarkedIds}
              favouriteIds={favouriteIds}
              watchedIds={watchedIds}
              addBookMark={addBookMark}
              addFavourite={addFavourite}
              addWatched={addWatched}
              kind='dropdown'
              type='movie'
              item={details}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieDetailsItem
