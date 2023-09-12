import React, { useState, useEffect } from "react";
import * as MovieApi from "../../../api/MovieApi";
import CarouselItem from "../../../components/CarouselItem";
import Paginations from "../../../components/Pagination ";
import Loading from "../../../components/uiElements/preloading";
import { useOutletContext, useParams } from "react-router-dom";

function Movie(props) {
  let {
    addBookMark,
    bookmarkedIds,
    favouriteIds,
    addFavourite,
    watchedIds,
    addWatched,
  } = props;
  let [date, country, handleChange, currentPage, filteredGenre] =
    useOutletContext();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  let { type } = useParams();

  const handlePageChange = async (pageNumber) => {
    handleChange(pageNumber);
    if (filteredGenre.length > 0 && date === "all") {
      loadByDateAndGenere(pageNumber, "all", filteredGenre, country);
    } else if (date === "latest") {
      loadByDateAndGenere(pageNumber, "desc", filteredGenre, country);
    } else if (date === "oldest") {
      loadByDateAndGenere(pageNumber, "asc", filteredGenre, country);
    } else {
      loadData(pageNumber);
    }
  };

  const loadByDateAndGenere = async (currentPage, order, genre, country) => {
    setIsLoading(true);
    let genres = genre.length > 1 ? genre.join(", ") : genre.toString();
    MovieApi.SortByGenreAndDate(currentPage, order, genres, country, type).then(
      (movie) => {
        if (movie.total_pages >= 10) {
          setTotalPages(10);
        } else {
          setTotalPages(movie.total_pages);
        }
        MovieApi.list(movie.results).then((data) => {
          setMovies(data);
          setIsLoading(false);
        });
      }
    );
  };

  const loadData = async (currentPage) => {
    setIsLoading(true);
    if (type === "topRated") {
      MovieApi.topRatedMovies(currentPage, country).then((movie) => {
        if (movie.total_pages >= 10) {
          setTotalPages(10);
        } else {
          setTotalPages(movie.total_pages);
        }
        MovieApi.list(movie.results).then((data) => {
          setMovies(data);
          setIsLoading(false);
        });
      });
    } else if (type === "upcoming") {
      MovieApi.upcomingMovies(currentPage, country).then((movie) => {
        if (movie.total_pages >= 10) {
          setTotalPages(10);
        } else {
          setTotalPages(movie.total_pages);
        }
        MovieApi.list(movie.results).then((data) => {
          setMovies(data);
          setIsLoading(false);
        });
      });
    } else {
      MovieApi.popularMovies(currentPage, country).then((movie) => {
        if (movie.total_pages >= 10) {
          setTotalPages(10);
        } else {
          setTotalPages(movie.total_pages);
        }
        MovieApi.list(movie.results).then((data) => {
          setMovies(data);
          setIsLoading(false);
        });
      });
    }
  };

  useEffect(() => {
    if (filteredGenre.length > 0 && date === "all") {
      loadByDateAndGenere(currentPage, "all", filteredGenre, country);
    } else if (date === "latest") {
      loadByDateAndGenere(currentPage, "desc", filteredGenre, country);
    } else if (date === "oldest") {
      loadByDateAndGenere(currentPage, "asc", filteredGenre, country);
    } else {
      loadData(currentPage);
    }
    window.scrollTo(0, 0);
  }, [currentPage, date, country, type, filteredGenre]);

  return (
    <div className="d-flex flex-column justify-content-between">
      {isLoading ? (
        <Loading content={true} />
      ) : movies.length !== 0 ? (
        <div className="col-12 mb-4 movieList bookmarks mt-4 h-100">
          <div className="row">
            {movies.length !== 0 &&
              movies.map((item, i) => {
                return (
                  <div key={i} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                    <CarouselItem
                      link={`/details/movies/${item.id}`}
                      type="movie"
                      item={item}
                      addBookMark={addBookMark}
                      bookmarkedIds={bookmarkedIds}
                      favouriteIds={favouriteIds}
                      addFavourite={addFavourite}
                      watchedIds={watchedIds}
                      addWatched={addWatched}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <p className="text-center p-2">No data</p>
      )}
          {movies.length !== 0 && totalPages > 1 && (
      <Paginations
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      )}
    </div>
  );
}

export default Movie;
