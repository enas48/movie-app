import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

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
                {bookmarkedIds.includes(item.id.toString()) ? (
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={props => (
                      <Tooltip {...props}>Remove From Wishlist</Tooltip>
                    )}
                    placement='bottom'
                  >
                    <Button
                      onClick={e => handleBookmark(e, item.id, type)}
                      className='btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 '
                    >
                      <MdOutlineBookmark className='bookmark_icon' />
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={props => (
                      <Tooltip {...props}>Add to Wishlist</Tooltip>
                    )}
                    placement='bottom'
                  >
                    <Button
                      onClick={e => handleBookmark(e, item.id, type)}
                      className='btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 '
                    >
                      <MdOutlineBookmarkBorder className='bookmark_icon' />
                    </Button>
                  </OverlayTrigger>
                )}
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
