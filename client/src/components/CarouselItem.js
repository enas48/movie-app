import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Carousel from 'react-grid-carousel'

import {
  MdLocalMovies,
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdStar
} from 'react-icons/md'
import { PiTelevisionBold } from 'react-icons/pi'

function CarouselItem ({ link, item, type, addBookMark, bookmarkedIds }) {
  const handleBookmark = (e, id, type) => {
    e.stopPropagation()
    addBookMark(id, type)
  }

  return (
    <Carousel.Item>
      <LinkContainer
        to={`${link}`}
        onClick={() => (window.location.href = `${link}`)}
      >
        <div className='position-relative card-container'>
          <div
            className={`card trending d-flex flex-column justify-content-between`}
          >
            {item.image !== '' && <img src={item.image} alt={item.name} />}
            {item.image === '' && (
              <img src={process.env.PUBLIC_URL + '../../noimage.png'} alt='' />
            )}
            <div className='overlay'></div>
          </div>
          <div className='d-flex flex-column card-content'>
            <div className='d-flex align-items-center gap-1'>
              <MdStar className='text-warning' /> {item.rate}
              {type !== 'season' && (
                <button
                  onClick={e => handleBookmark(e, item.id, type)}
                  className='btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 '
                >
                  {bookmarkedIds.includes(item.id.toString()) ? (
                    <MdOutlineBookmark className='bookmark_icon' />
                  ) : (
                    <MdOutlineBookmarkBorder className='bookmark_icon' />
                  )}
                </button>
              )}
            </div>
            <div className='d-flex flex-column '>
              <div className='d-flex gap-2'>
                <span>{item.year}</span>
                <span>
                  {type === 'movie' ? <MdLocalMovies /> : <PiTelevisionBold />}
                </span>
              </div>
              <h5>
                {item?.title && item.title.length > 20
                  ? item.title.slice(0, 30 - 1) + '…'
                  : item.title}
              </h5>
            </div>
          </div>
        </div>
      </LinkContainer>
    </Carousel.Item>
  )
}

export default CarouselItem
