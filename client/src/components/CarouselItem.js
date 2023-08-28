import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import { MdStar } from 'react-icons/md'
import { PiTelevisionBold } from 'react-icons/pi'
import { BiCameraMovie } from 'react-icons/bi'
import BookmarkFavBtn from './BookmarkFavBtn'

function CarouselItem ({
  link,
  item,
  type,
  addBookMark,
  bookmarkedIds,
  favouriteIds,
  addFavourite
}) {
  const handleBookmark = (e, id, type) => {
    e.stopPropagation()
    addBookMark(id, type)
  }
  const handleFavourite = (e, id, type) => {
    e.stopPropagation()
    addFavourite(id, type)
  }

  return (
    <LinkContainer
      className='bg-container'
      to={`${link}`}
      onClick={() => (window.location.href = `${link}`)}
    >
      <div className='position-relative card-container'>
        <div
          className={`card trending d-flex flex-column justify-content-between`}
        >
          {item.image !== '' && (
            <LazyLoadImage src={item.image} alt={item.name} />
          )}
          {item.image === '' && type!=='season'&&(
            <LazyLoadImage
              src={process.env.PUBLIC_URL + '../../noimg2.jpg'}
              alt=''
            />
          )}
             {item.image === '' && type==='season'&&(
            <LazyLoadImage
              src={process.env.PUBLIC_URL + '../../noimage.png'}
              alt=''
            />
          )}
          <div className='overlay'></div>
        </div>
        <div className='d-flex flex-column card-content'>
          <div className='d-flex align-items-center gap-1'>
            <MdStar className='text-warning' /> {item.rate}
            <BookmarkFavBtn
              bookmarkedIds={bookmarkedIds}
              favouriteIds={favouriteIds}
              addBookMark={handleBookmark}
              addFavourite={handleFavourite}
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
            <h5 className=''>
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
