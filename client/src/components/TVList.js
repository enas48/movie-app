import React, { useEffect, useState } from "react";
// import Carousel from "react-grid-carousel";
import Slider from "react-slick";
import * as TvSeriesApi from "../api/TvSeriesApi";

import Loading from "../uiElements/preloading";
import CarouselItem from "./CarouselItem";
import { LinkContainer } from "react-router-bootstrap";

function TvList(props) {
  let {
    kind,
    id,
    addBookMark,
    bookmarkedIds,
    favouriteIds,
    addFavourite,
    cols,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: cols,
    slidesToScroll: cols,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: cols,
          slidesToScroll: cols,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
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
    if (kind === "onair") {
      TvSeriesApi.onAir().then((series) => {
        TvSeriesApi.list(series.results).then((data) => {
          setSeries(data.slice(0, 18));
        });
      });
    }
    if (kind === "topRated") {
      TvSeriesApi.topRatedSeries().then((series) => {
        TvSeriesApi.list(series.results).then((data) => {
          setSeries(data.slice(0, 18));
        });
      });
    }
    if (kind === "popular") {
      TvSeriesApi.popularSeries().then((series) => {
        TvSeriesApi.list(series.results).then((data) => {
          setSeries(data.slice(0, 18));
        });
      });
    }
    if (kind === "similar") {
      TvSeriesApi.similarSeries(id).then((series) => {
        TvSeriesApi.list(series.results).then((data) => {
          setSeries(data.slice(0, 18));
        });
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    loadData();
    setIsLoading(false);
  }, [kind, id]);

  return (
    <>
      {isLoading && <Loading />}
      {series.length !== 0 && (
        <>
          <div className="d-flex align-items-start justify-content-between">
            <h3 className="px-md-4 mb-4">
              {kind === "popular" && "Popular Tv Series"}
              {kind === "topRated" && "Top rated Tv Series"}
              {kind === "onair" && "On The Air"}
              {kind === "similar" && "Related Tv Series"}
            </h3>
            {kind !== "similar" && (
              <LinkContainer to={`/allseries/${kind}`}>
                <button className="btn custom-btn">View more</button>
              </LinkContainer>
            )}
          </div>
          <div className="col-11 mx-auto mb-5 movieList">
            {/* <Carousel cols={cols} rows={1} gap={10} loop autoplay={6000}> */}
            <Slider {...settings}>
              {series.length !== 0 &&
                series.map((item, i) => {
                  return (
                    // <Carousel.Item key={i}>
                      <CarouselItem
                      key={i}
                        link={`/details/series/${item.id}`}
                        type="tv"
                        item={item}
                        addBookMark={addBookMark}
                        bookmarkedIds={bookmarkedIds}
                        favouriteIds={favouriteIds}
                        addFavourite={addFavourite}
                      />
                    // </Carousel.Item>
                  );
                })}
                      </Slider>
            {/* </Carousel> */}
          </div>
        </>
      )}
    </>
  );
}

export default TvList;
