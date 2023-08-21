import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import * as TvSeriesApi from "../../api/TvSeriesApi";

function Episode({ episode, id, season_number }) {
  const [episodes, setEpisodes] = useState([]);
  const imagePerRow = 10;
  const [next, setNext] = useState(imagePerRow);
  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [video, setvideo] = useState("");

  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

  const handlePlay = (epNum) => {
    console.log(id);
    console.log(season_number);
    console.log(epNum);
    fetchMovieVideo(id, season_number, epNum);
    if(video===''){}
  
    window.open(video, "_blank");
  };
  const fetchMovieVideo = async (id, season_number, episode_number) => {
    try {
      TvSeriesApi.getSeriesVideo(id, season_number, episode_number).then(
        (data) => {
          console.log(data);
          if (data?.results && data.results.length !== 0) {
            let link = data.results[0].key;
            console.log(link)
            if (link !== null) {
              setvideo(`https://www.youtube.com/embed/${link}`);
              setDisabled(false);
            }
          }
     
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  let tvArr = useMemo(() => [], []);

  const loadEpisode = async (episode) => {
    console.log(episode);
    if (episode.length !== 0) {
      for (let data of episode) {
        if (data?.still_path && data.still_path !== null) {
          const response = await fetch(
            `https://image.tmdb.org/t/p/original${data.still_path}`
          );
          const image = await response;
          if (image?.url) {
            tvArr.push({
              id: data.id,
              overview: data?.overview && data.overview,
              name: data?.name && data.name,
              episode_number: data?.episode_number && data.episode_number,
              image: image.url,
            });
          } else {
            if (data.id) {
              tvArr.push({
                id: data.id,
                overview: data?.overview && data.overview,
                name: data?.name && data.name,
                episode_number: data?.episode_number && data.episode_number,
                image: "",
              });
            }
          }
        } else {
          if (data.id) {
            tvArr.push({
              id: data.id,
              overview: data?.overview && data.overview,
              name: data?.name && data.name,
              episode_number: data?.episode_number && data.episode_number,
              image: "",
            });
          }
        }
      }
      setEpisodes(tvArr);
    }
  };
  useEffect(() => {
    loadEpisode(episode);
   
  }, []);

  return (
    <>
      <div className="details-related-content eposides">
        {episodes.length !== 0 && (
          <>
            <h2>Episodes</h2>
            <div className="row m-0 gap-4 d-flex justify-content-center ">
              {episodes?.slice(0, next)?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="d-flex flex-column episode-container card card-container"
                  >
                    {item.image !== "" && (
                      <img src={item.image} alt={item.name} />
                    )}
                    {item.image === "" && (
                      <img
                        src={process.env.PUBLIC_URL + "../../noimage.png"}
                        alt=""
                      />
                    )}
                    <div className="overlay"></div>

                    <div className="card-body">
                      <span>
                        <span className="episode-num">
                          Eposide {item.episode_number}
                        </span>
                        <br />
                        <span className="text-secondry"> {item.name}</span>
                      </span>
                      <button
                        disabled={disabled}
                        className="btn icon-container"
                        onClick={(e) => handlePlay(item.episode_number)}
                      >
                        <FaPlay />
                      </button>
                      <span className="episode-content"> {item.overview} </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {next < episodes?.length && (
              <button
                className="m-auto btn custom-btn mt-4"
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

export default Episode;
