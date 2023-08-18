import React, { useEffect, useState, useMemo } from "react";
import * as MovieApi from "../api/MovieApi";
import Loading from "../uiElements/preloading";
import Carousel from "react-grid-carousel";
import { LinkContainer } from "react-router-bootstrap";
import {
  MdLocalMovies,
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdStar,
} from "react-icons/md";
import * as Movie from "../helpers/fetchmovies";

function MovieList(props) {
  let { kind, id } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const handleBookmark = (e, id, type) => {
    e.stopPropagation();
    props.addBookMark(id, type);
  };

  useEffect(() => {
    const loadData = async () => {
      if (kind === "trending") {
        MovieApi.trendingMovies().then((movie) => {
          Movie.list(movie.results).then((data) => {
            setMovies(data.slice(0, 18));
          });
        });
      }
      if (kind === "topRated") {
        MovieApi.topRatedMovies().then((movie) => {
          Movie.list(movie.results).then((data) => {
            setMovies(data.slice(0, 18));
          });
        });
      }
      if (kind === "upcoming") {
        MovieApi.upcomingMovies().then((movie) => {
          Movie.list(movie.results).then((data) => {
            setMovies(data.slice(0, 18));
          });
        });
      }
      if (kind === "similar") {
        MovieApi.similarMovie(id).then((movie) => {
          Movie.list(movie.results).then((data) => {
            setMovies(data.slice(0, 18));
          });
        });
      }
    };
    setIsLoading(true);
    loadData();
    setIsLoading(false);
  }, [kind, id]);

  function cols() {
    if (kind === "trending") {
      return 2;
    } else if (kind === "topRated") {
      return 3;
    } else {
      return 4;
    }
  }
  return (
    <>
      {isLoading && <Loading />}
      {movies.length !== 0 && (
        <>
          <h3 className="px-md-4">
            {kind === "trending" && "Trending movies"}
            {kind === "topRated" && "Top rated"}
            {kind === "upcoming" && "Upcoming"}
            {kind === "similar" && "Related Movies"}
          </h3>
          <div className="col-12 mb-4 movieList">
            <Carousel cols={cols()} rows={1} gap={10} loop autoplay={6000}>
              {movies.length !== 0 &&
                movies.map((item, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <LinkContainer
                        to={`/details/movies/${item.id}`}
                        onClick={() =>
                          (window.location.href = `/details/movies/${item.id}`)
                        }
                      >
                        <div className="position-relative card-container">
                          <div
                            className={`
                    card trending   d-flex flex-column justify-content-between`}
                          >
                            {item.image !== "" && (
                              <img src={item.image} alt={item.title} />
                            )}
                            <div className="overlay"></div>
                          </div>
                          <div className="d-flex flex-column card-content">
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
                                {item?.title && item.title.length > 20
                                  ? item.title.slice(0, 30 - 1) + "…"
                                  : item.title}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </LinkContainer>
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>
        </>
      )}
    </>
  );
}

export default MovieList;
