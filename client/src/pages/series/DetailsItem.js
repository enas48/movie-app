import React from 'react'
import { PiTelevisionBold } from 'react-icons/pi'
import { MdLanguage } from 'react-icons/md'
import StarRating from '../../components/StarRating'
import BfwButton from '../../components/bookFavWatch/BfwButton'

function DetailsItem ({
  addBookMark,
  bookmarkedIds,
  favouriteIds,
  addFavourite,
  watchedIds,
  addWatched,
  details,
  image
}) {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${image})` }}
        className=' details-bg details-content d-flex flex-column gap-2'
      >
        <div className='container'>
        <div className='d-flex gap-3 align-items-center'>
          <span>
            &bull;&nbsp;
            {details?.first_air_date &&
              new Date(details.first_air_date).getFullYear()}
          </span>
          <span>
            &bull;&nbsp;
            {details?.number_of_seasons && (
              <span>
                {details.number_of_seasons > 1
                  ? `${details.number_of_seasons} Seasons`
                  : `${details.number_of_seasons} Season`}{' '}
              </span>
            )}
          </span>
          <span
            className={
              details?.status && details.status === 'Ended'
                ? 'end px-1 rounded'
                : 'onair px-1 rounded'
            }
          >
            {details?.status && details.status === 'Ended'
              ? 'complete'
              : 'on air'}
          </span>
        </div>
        <h1>{details?.name}</h1>
        <div className='d-flex gap-1 flex-wrap'>
          {details?.genres &&
            details.genres.length !== 0 &&
            details.genres.map((item, i) => {
              return (
                <span
                  key={item.id}
                  className={
                    i === details.genres.length - 1 ? 'pe-2' : 'border-end pe-2'
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
          <span>
            Episodes:&nbsp;
            {details?.number_of_episodes && details.number_of_episodes}
          </span>
          {details?.spoken_languages &&
            details?.spoken_languages.length !== 0 &&
            details.spoken_languages[0]?.english_name && (
              <span className='d-flex gap-2 align-items-center'>
                <MdLanguage />
                <span>{details.spoken_languages[0].english_name}</span>
              </span>
            )}
          <span className='d-flex gap-2 align-items-center'>
            <PiTelevisionBold /> Tv Series
          </span>
        </div>

        <div className='d-flex gap-2'>
          <BfwButton
            bookmarkedIds={bookmarkedIds}
            favouriteIds={favouriteIds}
            watchedIds={watchedIds}
            addBookMark={addBookMark}
            addFavourite={addFavourite}
            addWatched={addWatched}
            kind='dropdown'
            type='tv'
            item={details}
          />
        </div>
      </div>
      </div>
    </>
  )
}

export default DetailsItem
