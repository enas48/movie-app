import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import * as TvSeriesApi from "../../api/TvSeriesApi";
import CarouselItem from "../../components/CarouselItem";
import Paginations from "../../components/Pagination ";
import Loading from "../../uiElements/preloading";

function TvSeries(props) {
  let { addBookMark, bookmarkedIds, favouriteIds, addFavourite } = props;
  const { seriesType } = useParams();
  console.log(seriesType);
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    loadData(currentPage);
  };

  const loadData = async (currentPage) => {
    setIsLoading(true);
    if (seriesType === "onair" || !seriesType) {
      TvSeriesApi.onAir(currentPage).then((series) => {
        if (series.total_Pages > 100) {
          setTotalPages(100);
        } else {
          setTotalPages(series.total_pages);
        }
        console.log(series);
        TvSeriesApi.list(series.results).then((data) => {
          setSeries(data.slice(0, 18));
        });
      });

      setIsLoading(false);
    }
    if (seriesType === "topRated") {
      TvSeriesApi.topRatedSeries(currentPage).then((series) => {
        console.log(series.total_pages > 100);
        if (series.total_pages > 100) {
          setTotalPages(50);
        } else {
          setTotalPages(series.total_pages);
        }
        TvSeriesApi.list(series.results).then((data) => {
          setSeries(data.slice(0, 18));
        });
      });

      setIsLoading(false);
    }
    if (seriesType === "popular") {
      TvSeriesApi.popularSeries(currentPage).then((series) => {
        if (series.total_pages > 100) {
          setTotalPages(100);
        } else {
          setTotalPages(series.total_pages);
        }
        console.log(series);

        TvSeriesApi.list(series.results).then((data) => {
          setSeries(data.slice(0, 18));
          console.log(data);
        });
      });

      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadData(currentPage);
    console.log(totalPages);
    console.log(currentPage);
  }, [seriesType, currentPage]);

  return (
    <>
      {isLoading && <Loading />}
      {series.length !== 0 && (
        <>
          <div className="col-12 mb-4 movieList bookmarks mt-lg-5">
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
            <Paginations
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            </div>

          </div>
        </>
      )}
    </>
  );
}

export default TvSeries;
