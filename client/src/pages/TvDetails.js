import React, { useEffect, useState } from "react";
import * as TvSeriesApi from "../api/TvSeriesApi";
import SidebarLayout from "../components/sidebarLayout";
import Loading from "../uiElements/preloading";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { FaPlay } from "react-icons/fa";
import TvList from "../components/TVList";
import {
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdLanguage,
} from "react-icons/md";
import SeasonList from "../components/SeasonList";
import RegisterModal from "../uiElements/RegisterModal";

function TvDetails(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [image, setImage] = useState(null);
  const [video, setvideo] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleBookmark = (e, id,type) => {
    e.stopPropagation();
    props.addBookMark(id,type);
  };

  const fetchSeriesVideo = async (id) => {
    setIsLoading(true);
    try {
      TvSeriesApi.getSeriesVideo(id).then((series) => {
        console.log(series);
        let firstKey = Object.keys(series.results)[0];
        let link = series.results[firstKey];
        setDisabled(true);
        if (link) {
          setvideo(link.link);
          setDisabled(false);
        }
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handlePlay = (id) => {
    // e.stopPropagation();
    fetchSeriesVideo(id);
    window.location.replace(video);
  };

  useEffect(() => {
    const loadData = async () => {
      // Wait for two second
      await new Promise(r => setTimeout(r, 1000))
      // Toggle loading state
      setIsLoading( false)
    }
    loadData()

    let preloadImages = async (series) => {
      if (series?.backdrop_path && series.backdrop_path !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/original/${series.backdrop_path}`
        );
        const image = await response;
        if (image.url) setImage(image.url);
      }
    };
    const fetchSeries = async (id) => {
      try {
        TvSeriesApi.getSeriesDetails(id).then((series) => {
          preloadImages(series);
          console.log(series);
          setDetails(series);
        // console.log(series.success)
        // if(series?.success && series.success===false){
        //   window.location.replace('/notfound')
        // }
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (id) {
      // setIsLoading(true);
      fetchSeries(id);
      // setIsLoading(false);
      //   fetchSeriesVideo(id)
    }
  }, [id]);

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
      <RegisterModal show={props.show} onLogin={props.onLogin} handleCloseModal={props.handleClose}/>  
        {details?.id &&
        <div className="details-container">
          <div
            style={{ backgroundImage: `url(${image})` }}
            className=" details-bg details-content d-flex flex-column gap-2"
          >
            <span className="d-flex gap-3 align-items-center">
              <span>
                &bull;&nbsp;
                {details?.first_air_date &&
                  new Date(details.first_air_date).getFullYear()}
              </span>
              <span>
                &bull;&nbsp;
                {details?.number_of_seasons && (
                  <span>
                    {details.number_of_seasons > 1
                      ? `${details.number_of_seasons} Seasons`
                      : `${details.number_of_seasons} Season`}{" "}
                  </span>
                )}
              </span>
              <span
                className={
                  details?.status && details.status === "Ended"
                    ? "end px-1 rounded"
                    : "onair px-1 rounded"
                }
              >
                {details?.status && details.status === "Ended"?"complete":"on air"}
              </span>
            </span>
            <h1>{details?.name}</h1>

            <div className="d-flex gap-1 flex-wrap">
              {details?.genres &&
                details.genres.length !== 0 &&
                details.genres.map((item, i) => {
                  return (
                    <span
                      key={item.id}
                      className={
                        i === details.genres.length - 1
                          ? "pe-2"
                          : "border-end pe-2"
                      }
                    >
                      {item.name}
                    </span>
                  );
                })}
            </div>
            <div className="d-flex gap-2 align-items-center mb-1">
              <StarRating
                rate={details?.vote_average && details.vote_average.toFixed(1)}
              />
              <span>
                {details?.vote_average && details.vote_average.toFixed(1)}/10
              </span>
            </div>
            <p className="col-md-8 col-lg-6">{details?.overview}</p>
            <div className="d-flex gap-4 mb-4 flex-wrap">
              <span>
                Episodes:{" "}
                {details?.number_of_episodes && details.number_of_episodes}
              </span>
          
              <span className="d-flex gap-2 align-items-center">
                <MdLanguage />
                <span>
                  {details?.spoken_languages &&
                    details.spoken_languages[0].english_name}
                </span>
              </span>
            </div>
            <div className="d-flex gap-2">
              {/* <button
                disabled={disabled}
                className="btn icon-container"
                onClick={(e) => handlePlay(details.id)}
              >
                Watch Now&nbsp;
                <FaPlay />
              </button> */}
              <button
                onClick={(e) => handleBookmark(e, details.id,'tv')}
                className=" btn icon-container bookmark"
              >
                Add to Bookmark&nbsp;
                {props.bookmarkedIds.includes(
                  details.id && details.id.toString()
                ) ? (
                  <MdOutlineBookmark className="bookmark_icon" />
                ) : (
                  <MdOutlineBookmarkBorder className="bookmark_icon" />
                )}
              </button>
            </div>
          </div>
          <div className="details-related-content">
            {details?.seasons && details.seasons.length !== 0 && (
              <SeasonList
                bookmarkedIds={props.bookmarkedIds}
                addBookMark={props.addBookMark}
                seasons={details.seasons}
              />
            )}

            <TvList
              bookmarkedIds={props.bookmarkedIds}
              addBookMark={props.addBookMark}
              kind="similar"
              id={id}
            />
          </div>
        </div>
}
      </SidebarLayout>
    </>
  );
}

export default TvDetails;
