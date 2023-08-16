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
import * as MovieList from "../helpers/fetchImages";


function MovieListKind(props) {
  let { kind, id } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  let imageArr = useMemo(() => [], []);

  const handleBookmark = (e, id) => {
    e.stopPropagation();
    props.addBookMark(id);
  };

  useEffect(() => {
    const loadData = async () => {
      if (kind === "trending") {
        MovieApi.trendingMovies().then((movie) => {
          setIsLoading(true);
          // preloadImages(movie.results);
          MovieList.list(movie.results).then((data) => {
            setMovies(data.slice(0, 18));
          });
          setIsLoading(false);
        });
      }
      if (kind === "topRated") {
        MovieApi.topRatedMovies().then((movie) => {
          setIsLoading(true);
          // preloadImages(movie.results);
          MovieList.list(movie.results).then((data) => {
            setMovies(data.slice(0, 18));
          });
          setIsLoading(false);
        });
      }
      if (kind === "upcoming") {
        MovieApi.upcomingMovies().then((movie) => {
          setIsLoading(true);
          // preloadImages(movie.results);
          MovieList.list(movie.results).then((data) => {
            setMovies(data.slice(0, 18));
          });
          setIsLoading(false);
        });
      }
      if (kind === "similar") {
        MovieApi.similarMovie(id).then((movie) => {
          setIsLoading(true);
          // preloadImages(movie.results);
          MovieList.list(movie.results).then((data) => {
            setMovies(data.slice(0, 18));
          });
          setIsLoading(false);
        });
      }
    };
    loadData();
  }, [imageArr, kind, id]);

  function cols() {
    if (kind === "similar") {
      return 5;
    } else if (kind === "trending") {
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
                    <div
                      className={`
                    ${props.kind === "trending" ? "pc" : ""}
                    card trending   d-flex flex-column justify-content-between`}
                    >
                      <img src={item.image} alt={item.title} />
                      <div className="overlay"></div>
                      <div className="d-flex align-items-center gap-1">
                        <MdStar className="text-warning" /> {item.rate}
                        <button
                          onClick={(e) => handleBookmark(e, item.id)}
                          className="btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 "
                        >
                          {props.bookmarkedIds.includes(item.id.toString()) ? (
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
                            <MdLocalMovies /> {item.type}
                          </span>
                        </div>
                        <h5>
                          {item.title.length > 20
                            ? item.title.slice(0, 30 - 1) + "…"
                            : item.title}
                        </h5>
                      </div>
                    </div>
                  </LinkContainer>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
    </>
  );
}

export default MovieListKind;
