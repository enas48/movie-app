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

function MovieListKind(props) {
  let kind = props.kind;
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  let imageArr = useMemo(() => [], []);

  const handleBookmark = (e, id) => {
    e.stopPropagation();
    props.addBookMark(id);
  };

  useEffect(() => {
    const loadData = async () => {
      let preloadImages = async (results) => {
        for (let data of results) {
          if (data?.backdrop_path && data.backdrop_path !== null) {
            const response = await fetch(
              `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
            );
            const image = await response;
            if (image?.url) {
              imageArr.push({
                id: data.id,
                title: data.title,
                year: new Date(data.release_date).getFullYear(),
                type: data.media_type,
                rate: data.vote_average.toFixed(1),
                image: image.url,
              });
            }
          }
        }
        setMovies(imageArr.slice(0, 18));
      };
      if (kind === "trending") {
        MovieApi.trendingMovies().then((movie) => {
          setIsLoading(true);
          preloadImages(movie.results);
          setIsLoading(false);
        });
      }
      if (kind === "topRated") {
        MovieApi.topRatedMovies().then((movie) => {
          setIsLoading(true);
          preloadImages(movie.results);
          setIsLoading(false);
        });
      }
      if (kind === "upcoming") {
        MovieApi.upcomingMovies().then((movie) => {
          setIsLoading(true);
          preloadImages(movie.results);
          setIsLoading(false);
        });
      }
    };
    loadData();
  }, [imageArr, kind]);

  return (
    <>
      {isLoading && <Loading />}
      <h3 className="px-md-4">
        {props.kind==='trending' &&  'Trending movies'}
        {props.kind==='topRated' &&  'Top rated'}
        {props.kind==='upcoming' &&  'Upcoming'}
       </h3>
      <div className="col-12 mb-4">
        <Carousel cols={2} rows={1} gap={10} loop autoplay={6000}>
          {movies.length !== 0 &&
            movies.map((item, i) => {
              return (
                <Carousel.Item key={i}>
                  <LinkContainer to={`/details/movies/${item.id}`}>
                    <div className="card trending pc  d-flex flex-column justify-content-between">
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
                        <h5>{item.title}</h5>
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
