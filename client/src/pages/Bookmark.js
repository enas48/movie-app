import React, { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import {
  MdLocalMovies,
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdStar,
} from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";

import AuthContext from "../helpers/authContext";

import SidebarLayout from "../components/sidebarLayout";
import Loading from "../uiElements/preloading";
import Search from "../components/search";

import * as MovieApi from "../api/MovieApi";
import * as TvSeriesApi from "../api/TvSeriesApi";
import * as Movie from "../helpers/fetchmovies";
import * as Series from "../helpers/fetchSeries";

function Bookmark(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [movieBookmarks, setMovieBookmarks] = useState([]);
  const [tvBookmarks, setTvBookmarks] = useState([]);
  const { userId } = useContext(AuthContext);

  let movieArr = useMemo(() => [], []);
  let tvArr = useMemo(() => [], []);

  const handleBookmark = (e, id, type) => {
    console.log(type);
    e.stopPropagation();
    props.addBookMark(id, type);

    if (type === "movie") {
      let filteredBookmarks = movieBookmarks.filter((item) => {
        return item.id !== id;
      });
      setMovieBookmarks(filteredBookmarks);
    }

    if (type === "tv") {
      let filteredBookmarks = tvBookmarks.filter((item) => {
        return item.id !== id;
      });
      setTvBookmarks(filteredBookmarks);
    }
  };

  const fetchBookmarks = async () => {
    try {
      setIsLoading(true);
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/bookmarks/${userId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (result.data.bookmark) {
        console.log(result.data.bookmark);
        let movieBookMarkedIds = result.data.bookmark
          .filter((item) => item.type === "movie")
          .map((item) => item.bookmark_id);
        console.log(movieBookMarkedIds);

        let tvBookMarkedIds = result.data.bookmark
          .filter((item) => item.type === "tv")
          .map((item) => item.bookmark_id);
        console.log(tvBookMarkedIds);

        loadMovieData(movieBookMarkedIds);
        loadTvData(tvBookMarkedIds);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadMovieData = async (ids) => {
    for (let data of ids) {
      const response = await MovieApi.getMovieDetails(data).then((movie) => {
        return movie;
      });
      const movie = await response;
      movieArr.push(movie);
    }

    Movie.list(movieArr).then((data) => {
      setMovieBookmarks(data);
    });
  };
  const loadTvData = async (ids) => {
    for (let data of ids) {
      const response = await TvSeriesApi.getSeriesDetails(data).then((tv) => {
        return tv;
      });
      const tv = await response;
      console.log(tv);
      tvArr.push(tv);
    }

    Series.list(tvArr).then((data) => {
      setTvBookmarks(data);
    });
  };
  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <div className="p-3">
          <Search label="Search for Bookmark" />
          <div className="col-12 mb-4 movieList bookmarks">
            <div className="row">
              {movieBookmarks.length !== 0 && <h3 className="mb-3">Movies</h3>}
              {movieBookmarks.length !== 0 &&
                movieBookmarks.map((item, i) => {
                  return (
                    <div key={i} className="col-sm-6 col-md-3 mb-4">
                      <LinkContainer
                        to={`/details/movies/${item.id}`}
                        onClick={() =>
                          (window.location.href = `/details/movies/${item.id}`)
                        }
                      >
                           <div className='position-relative card-container'>
                        <div
                          className={`
                    ${props.kind === "trending" ? "pc" : ""}
                    card trending   d-flex flex-column justify-content-between`}
                        >
                          <img src={item.image} alt={item.title} />
                          <div className="overlay"></div>
                          </div>
                          <div className='d-flex flex-column card-content'>
                          <div className="d-flex align-items-center gap-1">
                            <MdStar className="text-warning" /> {item.rate}
                            <button
                              onClick={(e) =>
                                handleBookmark(e, item.id, "movie")
                              }
                              className="btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 "
                            >
                              {props.bookmarkedIds.includes(
                                item.id.toString()
                              ) ? (
                                <MdOutlineBookmark className="bookmark_icon" />
                              ) : (
                                <MdOutlineBookmarkBorder className="bookmark_icon" />
                              )}
                            </button>
                          </div>
                          <div className="d-flex   flex-column ">
                            <div className="d-flex gap-2">
                              <span>{item.year}</span>
                              <span>
                                <MdLocalMovies />
                              </span>
                            </div>
                            <h5>
                              {item.title.length > 20
                                ? item.title.slice(0, 30 - 1) + "…"
                                : item.title}
                            </h5>
                          </div>
                        </div>
                        </div>
                      </LinkContainer>
                    </div>
                  );
                })}
            </div>
            <div className="row">
              {tvBookmarks.length !== 0 && <h3 className="mb-3">Tv Series</h3>}
              {tvBookmarks.length !== 0 &&
                tvBookmarks.map((item, i) => {
                  return (
                    <div key={i} className="col-sm-6 col-md-3 mb-4">
                      <LinkContainer
                        to={`/details/series/${item.id}`}
                        onClick={() =>
                          (window.location.href = `/details/series/${item.id}`)
                        }
                      >
                        <div className='position-relative card-container'>
                        <div
                          className={`
                    ${props.kind === "trending" ? "pc" : ""}
                    card trending   d-flex flex-column justify-content-between`}
                        >
                          <img src={item.image} alt={item.title} />
                          <div className="overlay"></div>
                          </div>
                          <div className='d-flex flex-column card-content'>
                          <div className="d-flex align-items-center gap-1">
                            <MdStar className="text-warning" /> {item.rate}
                            <button
                              onClick={(e) => handleBookmark(e, item.id, "tv")}
                              className="btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 "
                            >
                              {props.bookmarkedIds.includes(
                                item.id.toString()
                              ) ? (
                                <MdOutlineBookmark className="bookmark_icon" />
                              ) : (
                                <MdOutlineBookmarkBorder className="bookmark_icon" />
                              )}
                            </button>
                          </div>
                          <div className="d-flex   flex-column ">
                            <div className="d-flex gap-2">
                              <span>{item.year}</span>
                              <span>
                                <PiTelevisionBold />
                              </span>
                            </div>
                            <h5>
                              {item.name.length > 20
                                ? item.name.slice(0, 30 - 1) + "…"
                                : item.name}
                            </h5>
                          </div>
                          </div>
                        </div>
                      </LinkContainer>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}

export default Bookmark;
