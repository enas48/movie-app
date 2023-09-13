import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdStar } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { BiCameraMovie } from "react-icons/bi";
import BfwButton from "./BfwButton";

function BfwItem({
  link,
  item,
  type,
  addBookMark,
  bookmarkedIds,
  favouriteIds,
  addFavourite,
  watchedIds,
  addWatched,
}) {

  return (
    <>
      <div className="col-sm-6 col-md-4 col-xl-3 mb-4  ">
        <LinkContainer
          to={`${link}/${item.id}`}
          onClick={() => (window.location.href = `${link}/${item.id}`)}
        >
          <div className="position-relative card-container">
            <div
              className={`card trending  d-flex flex-column justify-content-between`}
            >
              <LazyLoadImage src={item.image} alt={item.title} />
              <div className="overlay"></div>
            </div>
            <div className="d-flex flex-column card-content">
              <div className="d-flex align-items-center gap-1  flex-warp justify-content-between ">
              <span className='flex-shrink-0'>
              <MdStar className='text-warning' /> {item.rate}
            </span >
                <BfwButton
                  bookmarkedIds={bookmarkedIds}
                  favouriteIds={favouriteIds}
                  addBookMark={addBookMark}
                  addFavourite={addFavourite}
                  watchedIds={watchedIds}
                  addWatched={addWatched}
                  kind="btnContainer"
                  type={type}
                  item={item}
                />
              </div>
              <div className="d-flex   flex-column ">
                <div className="d-flex gap-2">
                  <span>{item.year}</span>
                  <span>
                    {type === "movie" ? (
                      <BiCameraMovie />
                    ) : (
                      <PiTelevisionBold />
                    )}
                  </span>
                </div>
                <h5 title={item?.title}>
                  {item.title.length > 20
                    ? item.title.slice(0, 20 - 1) + "…"
                    : item.title}
                </h5>
              </div>
            </div>
          </div>
        </LinkContainer>
      </div>
    </>
  );
}

export default BfwItem;
