import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import { MdStar } from 'react-icons/md'
import { PiTelevisionBold } from 'react-icons/pi'
import { BiCameraMovie } from 'react-icons/bi'
import BfwButton from './bookFavWatch/BfwButton'

function CarouselItem ({
  link,
  item,
  type,
  addBookMark,
  bookmarkedIds,
  favouriteIds,
  addFavourite,
  watchedIds,
  addWatched,
  clearVideoKey = () => {}
}) {
  const handleBookmark = (e, id, type) => {
    e.stopPropagation()
    addBookMark(id, type)
  }
  const handleFavourite = (e, id, type) => {
    e.stopPropagation()
    addFavourite(id, type)
  }
  const handleWatched = (e, id, type) => {
    e.stopPropagation()
    addWatched(id, type)
  }
  const handleClick = () => {
    clearVideoKey()
    window.scrollTo(0, 0)
  }
  return (
    <LinkContainer
      className='bg-container'
      to={`${link}`}
      // onClick={() => (window.location.href = `${link}`)}
      onClick={handleClick}
    >
      <div className='position-relative card-container'>
        <div
          className={`card trending d-flex flex-column justify-content-between`}
        >
          {item.image !== '' && (
            <LazyLoadImage src={item.image} alt={item.name} />
          )}
          {item.image === '' && type !== 'season' && (
            <LazyLoadImage
              src={process.env.PUBLIC_URL + '../../noimg2.jpg'}
              alt=''
            />
          )}
          {item.image === '' && type === 'season' && (
            <LazyLoadImage
              src={process.env.PUBLIC_URL + '../../noimage.png'}
              alt=''
            />
          )}
          <div className='overlay'></div>
        </div>
        <div className='d-flex flex-column card-content'>
          <div className='d-flex align-items-center gap-1 flex-wrap justify-content-between '>
            <span className='flex-shrink-0'>
              <MdStar className='text-warning' /> {item.rate}
            </span>
            <BfwButton
              bookmarkedIds={bookmarkedIds}
              favouriteIds={favouriteIds}
              watchedIds={watchedIds}
              addBookMark={handleBookmark}
              addFavourite={handleFavourite}
              addWatched={handleWatched}
              kind='btnContainer'
              type={type}
              item={item}
            />
          </div>
          <div className='d-flex flex-column '>
            <div className='d-flex gap-2'>
              <span>{item.year}</span>
              <span>
                {type === 'movie' ? <BiCameraMovie /> : <PiTelevisionBold />}
              </span>
            </div>
            <h5 className='' title={item?.title}>
              {item?.title && item.title.length > 20
                ? item.title.slice(0, 20 - 1) + '…'
                : item.title}
            </h5>
          </div>
        </div>
      </div>
    </LinkContainer>
  )
}

export default CarouselItem
