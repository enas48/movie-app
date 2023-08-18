import React, { useEffect, useMemo, useState } from "react";
import TvList from "./TVList";
import * as TvSeriesApi from "../api/TvSeriesApi";
import Carousel from "react-grid-carousel";
import { LinkContainer } from "react-router-bootstrap";
import {
  MdStar,
} from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";

function SeasonList(props) {
  const [series, setSeries] = useState([]);
  let seasons = props.seasons;

  let imageArr = useMemo(() => [], []);

  let preloadImages = async (results) => {
    console.log(results);
    for (let data of results) {
      if (data?.poster_path && data.poster_path !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/original/${data.poster_path}`
        );
        const image = await response;
        if (image?.url) {
          imageArr.push({
            id: data.id,
            name: data.name,
            year: new Date(data.air_date).getFullYear(),
            season_number: data.season_number,
            rate: data.vote_average.toFixed(1),
            image: image.url,
          });
        }
      } else{
        if(data.id){
          imageArr.push({
            id: data.id,
            name: data.name,
            year: new Date(data.air_date).getFullYear(),
            season_number: data.season_number,
            rate: data.vote_average.toFixed(1),
            image: '',
          });
        }

      }
    }

  
    console.log(series)
  };
  useEffect(() => {
    console.log(seasons);
    preloadImages(seasons);
    setSeries(imageArr);
    console.log(imageArr)
  }, [seasons]);
  return (
    <>
      {series.length !== 0 && (
        <div className="seasons-list">
          <h3 className="px-md-4 mb-4">Seasons</h3>
          <div className="col-12 mb-5 movieList">
            <Carousel cols={4} rows={1} gap={10} loop autoplay={6000}>
              {series.length !== 0 &&
                series.map((item, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <LinkContainer
                        to={`/details/series/${item.id}`}
                        onClick={() =>
                          (window.location.href = `/details/series/${item.id}`)
                        }
                      >
                        <div className="position-relative card-container">
                          <div
                            className={`
                    card trending   d-flex flex-column justify-content-between`}
                          >
                            {item.image !== "" && (
                              <img src={item.image} alt={item.name} />
                            )}
                            {item.image ==='' &&(
                              <img src={process.env.PUBLIC_URL + '../../noimage.png'} alt=""/>
                            )}
                            <div className="overlay"></div>
                          </div>
                          <div className="d-flex flex-column card-content">
                            <div className="d-flex align-items-center gap-1">
                              <MdStar className="text-warning" /> {item.rate}
                            </div>
                            <div className="d-flex   flex-column ">
                              <div className="d-flex gap-2">
                                <span>{item.year}</span>
                                <span>
                                  <PiTelevisionBold />
                                </span>
                              </div>
                              <h5>
                                {item?.name && item.name.length > 20
                                  ? item.name.slice(0, 30 - 1) + "…"
                                  : item.name}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </LinkContainer>
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
