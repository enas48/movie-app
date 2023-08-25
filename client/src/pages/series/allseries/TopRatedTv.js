import React, { useState, useEffect } from "react";
import * as TvSeriesApi from "../../../api/TvSeriesApi";
import CarouselItem from "../../../components/CarouselItem";
import Paginations from "../../../components/Pagination ";
import Loading from "../../../uiElements/preloading";

function TopRatedTv(props) {
  let { addBookMark, bookmarkedIds, favouriteIds, addFavourite } = props;
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    loadData(pageNumber);
  };

  const loadData = async (currentPage) => {
    setIsLoading(true);
    TvSeriesApi.topRatedSeries(currentPage).then((series) => {
      if (series.total_pages >= 500) {
        setTotalPages(500);
      } else {
        setTotalPages(series.total_pages);
      }
      TvSeriesApi.list(series.results).then((data) => {
        setSeries(data.slice(0, 20));
        setIsLoading(false);
      });
    });
  };
  useEffect(() => {
    loadData(currentPage);
    console.log(currentPage);
  }, [currentPage]);

  return (
    <div className="d-flex flex-column justify-content-between">
    {isLoading ? (
      <Loading content={true} />
    ) : series.length !== 0 ? (
      <div className="col-12 mb-4 movieList bookmarks mt-4 h-100">
        <div className="row">
          {series.length !== 0 &&
            series.map((item, i) => {
              return (
                <div key={i} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                  <CarouselItem
                    link={`/details/series/${item.id}`}
                    type="tv"
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

export default TopRatedTv;
