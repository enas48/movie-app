import React, { useEffect, useState } from "react";
// import Carousel from "react-grid-carousel";
import Slider from "react-slick";
import * as TvSeriesApi from "../api/TvSeriesApi";

import CarouselItem from "./CarouselItem";

function SeasonList({ seasons, seriesId }) {
  const [series, setSeries] = useState([]);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
   
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
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
  useEffect(() => {
    TvSeriesApi.seasonList(seasons).then((data) => {
      setSeries(data);
    });
    console.log(series)
  }, [seasons]);

  return (
    <>
      {series.length !== 0 && (
        <div className="seasons-list">
          <h3 className="px-md-4 mb-4">Seasons</h3>
          <div className="col-11 mx-auto mb-5 movieList">
            {/* <Carousel cols={5} rows={1} gap={10} loop autoplay={6000}> */}
            <Slider {...settings}>
              {series.length !== 0 &&
                series.map((item, i) => {
                  return (
                    // <Carousel.Item key={i}>
                    <CarouselItem
                      key={i}
                      link={`/season/${seriesId}/${item.season_number}`}
                      type="season"
                      item={item}
                    />
                    // {/* </Carousel.Item> */}
                  );
                })}
            </Slider>
            {/* </Carousel> */}
          </div>
        </div>
      )}
    </>
  );
}

export default SeasonList;
