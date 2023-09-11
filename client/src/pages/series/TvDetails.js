import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import * as TvSeriesApi from "../../api/TvSeriesApi";

import SidebarLayout from "../../components/sidebar/sidebarLayout";
import StarRating from "../../components/StarRating";
import TvList from "../../components/TVList";
import SeasonList from "../../components/SeasonList";
import Search from "../../components/search/search";
import RegisterModal from "../../components/uiElements/RegisterModal";
import Loading from "../../components/uiElements/preloading";
import Video from "../../components/video/Video";
import { PiTelevisionBold } from "react-icons/pi";
import { MdLanguage } from "react-icons/md";
import Comments from "../../components/comment/Comments";
import AuthContext from "../../helpers/authContext";
import BfwButton from "../../components/bookFavWatch/BfwButton";

function TvDetails({
  addBookMark,
  bookmarkedIds,
  favouriteIds,
  addFavourite,
  watchedIds,
  addWatched,
  handleClose,
  show,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [image, setImage] = useState(null);
  const [key, setKey] = useState(null);
  const [video, setVideos] = useState([]);
  const { userId } = useContext(AuthContext);

  const handleBookmark = (e, id, type) => {
    e.stopPropagation();
    addBookMark(id, type);
  };
  const handleFavourite = (e, id, type) => {
    e.stopPropagation();
    addFavourite(id, type);
  };
  const handleWatched = (e, id, type) => {
    e.stopPropagation();
    addWatched(id, type);
  };
  const clearVideoKey=()=>{
    setKey(null)
  }
  const preloadImages = async (series) => {
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
        setDetails(series);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTrailer = async (id) => {
    try {
      TvSeriesApi.Trailer(id).then((data) => {
        let youtubeVideos = data.results.filter((d) => d.site === "YouTube");
        setVideos(youtubeVideos);
        if (youtubeVideos[0]?.key && key === null) {
          setKey(youtubeVideos[0].key);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
    const playVideo = (key) => {
      setKey(key);
    };
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      setIsLoading(false);
    };
    loadData();
    if (id) {
      fetchSeries(id);
      fetchTrailer(id);
    }

    console.log(key)
    // return () => { setKey(null)  };
  }, [id, key]);

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <Search />
        <RegisterModal show={show} handleCloseModal={handleClose} />
        {details?.id && (
          <div className="details-container ">
            <div
              style={{ backgroundImage: `url(${image})` }}
              className=" details-bg details-content d-flex flex-column gap-2"
            >
              <div className="d-flex gap-3 align-items-center">
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
                  {details?.status && details.status === "Ended"
                    ? "complete"
                    : "on air"}
                </span>
              </div>
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
                  rate={
                    details?.vote_average && details.vote_average.toFixed(1)
                  }
                />
                <span>
                  {details?.vote_average && details.vote_average.toFixed(1)}/10
                </span>
              </div>
              <p className="col-md-8 col-lg-6">{details?.overview}</p>
              <div className="d-flex gap-4 mb-4 flex-wrap">
                <span>
                  Episodes:&nbsp;
                  {details?.number_of_episodes && details.number_of_episodes}
                </span>
                {details?.spoken_languages &&
                  details?.spoken_languages.length !== 0 &&
                  details.spoken_languages[0]?.english_name && (
                    <span className="d-flex gap-2 align-items-center">
                      <MdLanguage />
                      <span>{details.spoken_languages[0].english_name}</span>
                    </span>
                  )}
                <span className="d-flex gap-2 align-items-center">
                  <PiTelevisionBold /> Tv Series
                </span>
              </div>

              <div className="d-flex gap-2">
                <BfwButton
               bookmarkedIds={bookmarkedIds}
               favouriteIds={favouriteIds}
               watchedIds={watchedIds}
               addBookMark={handleBookmark}
               addFavourite={handleFavourite}
               addWatched={handleWatched}
                  kind="dropdown"
                  type="tv"
                  item={details}
                />
              </div>
            </div>
            <Video keyVideo={key} playVideo={playVideo} video={video} />
            <Comments id={id} type="tv" currentUserId={userId} />
            <div className="details-related-content">
              {details?.seasons && details.seasons.length !== 0 && (
                <SeasonList
                  bookmarkedIds={bookmarkedIds}
                  addBookMark={addBookMark}
                  favouriteIds={favouriteIds}
                  addFavourite={addFavourite}
                  watchedIds={watchedIds}
                  addWatched={addWatched}
                  seasons={details.seasons}
                  seriesId={details.id}
                  clearVideoKey={clearVideoKey}
                />
              )}

              <TvList
                bookmarkedIds={bookmarkedIds}
                addBookMark={addBookMark}
                favouriteIds={favouriteIds}
                addFavourite={addFavourite}
                watchedIds={watchedIds}
                addWatched={addWatched}
                kind="similar"
                id={id}
                cols={4}
                clearVideoKey={clearVideoKey}
              />
            </div>
          </div>
        )}
      </SidebarLayout>
    </>
  );
}

export default TvDetails;
