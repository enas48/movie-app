import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as TvSeriesApi from "../api/TvSeriesApi";
import * as MovieApi from "../api/MovieApi";

function Crew({ id, type }) {
  const [crew, setCrew] = useState([]);
  const imagePerRow = 8;
  const [next, setNext] = useState(imagePerRow);
  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

  const fetchTvCrew = async (id) => {
    try {
      TvSeriesApi.cast(id).then((crew) => {
        TvSeriesApi.crewList(crew.cast).then((data) => {
          setCrew(data);
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMovieCrew = async (id) => {
    try {
      MovieApi.cast(id).then((crew) => {
        TvSeriesApi.crewList(crew.cast).then((data) => {
          setCrew(data);
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (type === "tv") {
      fetchTvCrew(id);
    }
    if (type === "movie") {
      fetchMovieCrew(id);
    }
  }, [id]);

  return (
    <>
      <div className="details-related-content">
        {crew.length !== 0 && (
          <>
            <h2>Cast</h2>
            <div className="row m-0 gap-4 d-flex justify-content-center ">
              {crew?.slice(0, next)?.map((item) => {
                return (
                  <LinkContainer to={`/person/${item.id}`} key={item.id}>
                    <div className="d-flex flex-wrap flex-row align-items-center justify-content-center crew card card-container">
                      <div className="img-container">
                        {item.image !== "" && (
                          <LazyLoadImage src={item.image} alt={item.name} />
                        )}
                        {item.image === "" && (
                          <LazyLoadImage
                          className="no-img"
                            src={process.env.PUBLIC_URL + "../../noimage.png"}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="card-body">
                        <span className="text-secondry"> {item.name}</span>
                        <br />
                        <span> {item.character} </span>
                      </div>
                    </div>
                  </LinkContainer>
                );
              })}
            </div>
            {next < crew?.length && (
              <button
                className="m-auto btn custom-btn"
                onClick={handleMoreImage}
              >
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Crew;
