import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import {
  MdLocalMovies,
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdStar
} from 'react-icons/md'
import { PiTelevisionBold } from 'react-icons/pi'

function BookmarkItem ({ link, item, type, handleBookmark, bookmarkedIds }) {
  return (
    <>
      <div className='col-sm-6 col-md-3 mb-4'>
        <LinkContainer
          to={`${link}/${item.id}`}
          onClick={() => (window.location.href = `${link}/${item.id}`)}
        >
          <div className='position-relative card-container'>
            <div
              className={`card trending  d-flex flex-column justify-content-between`}
            >
              <img src={item.image} alt={item.title} />
              <div className='overlay'></div>
            </div>
            <div className='d-flex flex-column card-content'>
              <div className='d-flex align-items-center gap-1'>
                <MdStar className='text-warning' /> {item.rate}
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
              </div>
              <div className='d-flex   flex-column '>
                <div className='d-flex gap-2'>
                  <span>{item.year}</span>
                  <span>
                    {type === 'movie' ? (
                      <MdLocalMovies />
                    ) : (
                      <PiTelevisionBold />
                    )}
                  </span>
                </div>
                <h5>
                  {item.title.length > 20
                    ? item.title.slice(0, 30 - 1) + '…'
                    : item.title}
                </h5>
              </div>
            </div>
          </div>
        </LinkContainer>
      </div>
    </>
  )
}

export default BookmarkItem
