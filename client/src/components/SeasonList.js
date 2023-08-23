import React, { useEffect, useState } from "react";
import Carousel from "react-grid-carousel";

import * as TvSeriesApi from "../api/TvSeriesApi";

import CarouselItem from "./CarouselItem";

function SeasonList({ seasons, seriesId }) {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    TvSeriesApi.seasonList(seasons).then((data) => {
      setSeries(data);
    });
  }, [seasons]);

  return (
    <>
      {series.length !== 0 && (
        <div className="seasons-list">
          <h3 className="px-md-4 mb-4">Seasons</h3>
          <div className="col-12 mb-5 movieList">
            <Carousel cols={5} rows={1} gap={10} loop autoplay={6000}>
              {series.length !== 0 &&
                series.map((item, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <CarouselItem
                        link={`/season/${seriesId}/${item.season_number}`}
                        type="season"
                        item={item}
                      />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
}

export default SeasonList;
