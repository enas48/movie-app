import React, { useEffect, useState } from "react";
// import Carousel from "react-grid-carousel";
import Slider from "react-slick";
import * as MovieApi from "../api/MovieApi";

import Loading from "./uiElements/preloading";
import CarouselItem from "./CarouselItem";
import { LinkContainer } from "react-router-bootstrap";

function MovieList(props) {
  let {
    kind,
    id,
    addBookMark,
    bookmarkedIds,
    favouriteIds,
    addFavourite,
    watchedIds,
    addWatched,
    cols,
    clearVideoKey,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [badWords, setBadwords] = useState([]);

  let ipadCols = kind === "upcoming" ? cols - 1 : cols;
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: cols,
    slidesToScroll: cols,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 678,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const loadData = async () => {
    if (kind === "trending") {
      setIsLoading(true);
      MovieApi.trendingMovies().then((movie) => {
        MovieApi.list(movie.results).then((data) => {
          let filtered = data.filter((i) => {
            const helloExist = badWords.some((item) =>
              (i?.name || i?.title).includes(item)
            );

            if (!helloExist) { 
              return i;
            }
          });
          setMovies(filtered.slice(0, 20));
          setIsLoading(false);
        });
      });
    }
    if (kind === "topRated") {
      setIsLoading(true);
      MovieApi.topRatedMovies().then((movie) => {
        MovieApi.list(movie.results).then((data) => {
          let filtered = data.filter((i) => {
            const helloExist = badWords.some((item) =>
              (i?.name || i?.title).includes(item)
            );

            if (!helloExist) { 
              return i;
            }
          });
          setMovies(filtered.slice(0, 20));
          setIsLoading(false);
        });
      });
    }
    if (kind === "upcoming") {
      setIsLoading(true);
      MovieApi.upcomingMovies().then((movie) => {
        MovieApi.list(movie.results).then((data) => {
          let filtered = data.filter((i) => {
            const helloExist = badWords.some((item) =>
              (i?.name || i?.title).includes(item)
            );

            if (!helloExist) { 
              return i;
            }
          });
          setMovies(filtered.slice(0, 20));
          setIsLoading(false);
        });
      });
    }
    if (kind === "similar") {
      MovieApi.similarMovie(id).then((movie) => {
        setIsLoading(true);
        MovieApi.list(movie.results).then((data) => {
          setMovies(data.slice(0, 20));
          setIsLoading(false);
        });
      });
    }
  };

  useEffect(() => {
    MovieApi.badWords().then((data) => setBadwords(data));
    loadData();
  }, [kind, id]);

  return (
    <div className="list container">
      {movies.length !== 0 && (
        <>
          <div className="d-flex align-items-start justify-content-between">
            <h3 className=" mb-4">
              {kind === "trending" && "Trending movies"}
              {kind === "topRated" && "Top rated movies"}
              {kind === "upcoming" && "Upcoming movies"}
              {kind === "similar" && "Related Movies"}
            </h3>
            {kind !== "similar" && (
              <LinkContainer to={`/allmovies/${kind}`}>
                <button className="btn custom-btn">View more</button>
              </LinkContainer>
            )}
          </div>
          {isLoading ? (
            <Loading content={true} />
          ) : (
            <div className="col-12 mx-auto mb-4 movieList">
              <Slider {...settings}>
                {movies.length !== 0 &&
                  movies.map((item, i) => {
                    return (
                      <CarouselItem
                        key={i}
                        link={`/details/movies/${item.id}`}
                        type="movie"
                        item={item}
                        addBookMark={addBookMark}
                        bookmarkedIds={bookmarkedIds}
                        favouriteIds={favouriteIds}
                        addFavourite={addFavourite}
                        watchedIds={watchedIds}
                        addWatched={addWatched}
                        clearVideoKey={clearVideoKey}
                      />
                    );
                  })}
              </Slider>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MovieList;
