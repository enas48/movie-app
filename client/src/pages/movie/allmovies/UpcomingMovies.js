import React, { useState, useEffect } from "react";
import * as MovieApi from "../../../api/MovieApi";
import CarouselItem from "../../../components/CarouselItem";
import Paginations from "../../../components/Pagination ";
import Loading from "../../../uiElements/preloading";

function UpcomingMovies(props) {
  let { addBookMark, bookmarkedIds, favouriteIds, addFavourite } = props;
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    loadData(pageNumber);
  };

  const loadData = async (currentPage) => {
    setIsLoading(true);
    MovieApi.upcomingMovies(currentPage).then((movie) => {
      console.log(movie);
      if (movie.total_pages >= 500) {
        setTotalPages(500);
      } else {
        setTotalPages(movie.total_pages);
      }
      MovieApi.list(movie.results).then((data) => {
        console.log(data);
        setMovies(data.slice(0, 20));
        setIsLoading(false);
      });
    });
  };
  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

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
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <p className="text-center p-2">No data</p>
        )}
        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
   
  );
}

export default UpcomingMovies;
