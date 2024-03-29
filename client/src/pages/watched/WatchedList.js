import React, { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import Loading from "../../components/uiElements/preloading";
import * as MovieApi from "../../api/MovieApi";
import * as TvSeriesApi from "../../api/TvSeriesApi";
import BfwItem from "../../components/bookFavWatch/BfwItem";
import AuthContext from "../../helpers/authContext";

function WatchedList(props) {
  const {
    addBookMark,
    bookmarkedIds,
    favouriteIds,
    addFavourite,
    watchedIds,
    addWatched,
    profileUserId,
    profilePage,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [watchedMovie, setWatchedMovie] = useState([]);
  const [WatchedTv, setWatchedTv] = useState([]);
  const { userId } = useContext(AuthContext);

  let movieArr = useMemo(() => [], []);
  let tvArr = useMemo(() => [], []);

  const handleWatched = (e, id, type) => {
    e.stopPropagation();
    addWatched(id, type);
    if (!profilePage || userId === profileUserId) {
      if (type === "movie") {
        let filteredWatched = watchedMovie.filter((item) => {
          return item.id !== id;
        });
        setWatchedMovie(filteredWatched);
      }
      if (type === "tv") {
        let filteredWatched = WatchedTv.filter((item) => {
          return item.id !== id;
        });
        setWatchedTv(filteredWatched);
      }
    }
  };
  const handleBookmark = (e, id, type) => {
    e.stopPropagation();
    addBookMark(id, type);
  };
  const handleFavourite = (e, id, type) => {
    e.stopPropagation();
    addFavourite(id, type);
  };

  const loadMovieData = async (ids) => {
    for (let data of ids) {
      const response = await MovieApi.getMovieDetails(data).then((movie) => {
        return movie;
      });
      const movie = await response;
      movieArr.push(movie);
    }
    MovieApi.list(movieArr).then((data) => {
      setWatchedMovie(data);
    });
  };

  const loadTvData = async (ids) => {
    for (let data of ids) {
      const response = await TvSeriesApi.getSeriesDetails(data).then((tv) => {
        return tv;
      });
      const tv = await response;
      tvArr.push(tv);
    }
    TvSeriesApi.list(tvArr).then((data) => {
      setWatchedTv(data);
    });
  };

  const fetchWatched = async () => {
    try {
      setIsLoading(true);
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/watched/${profileUserId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (result.data.watched) {
        let movieWatchedIds = result.data.watched
          .filter((item) => item.type === "movie")
          .map((item) => item.watched_id);

        let tvWatchedIds = result.data.watched
          .filter((item) => item.type === "tv")
          .map((item) => item.watched_id);

        loadMovieData(movieWatchedIds);
        loadTvData(tvWatchedIds);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWatched();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading content={true} />
      ) : (
        <div className="col-12 mb-4 movieList bookmarks ">
          <div className="row">
            <h3 className="mb-3">Movies</h3>
            {watchedMovie.length !== 0 ? (
              watchedMovie.map((item, i) => {
                return (
                  <BfwItem
                    key={i}
                    link="/details/movies"
                    item={item}
                    type="movie"
                    addBookMark={handleBookmark}
                    bookmarkedIds={bookmarkedIds}
                    favouriteIds={favouriteIds}
                    addFavourite={handleFavourite}
                    watchedIds={watchedIds}
                    addWatched={handleWatched}
                    profilePage={profilePage}
                  />
                );
              })
            ) : (
              <h5 className="mb-3 text-white-50 text-center">No data found</h5>
            )}
          </div>
          <div className="row">
            <h3 className="mb-3">Tv Series</h3>
            {WatchedTv.length !== 0 ? (
              WatchedTv.map((item, i) => {
                return (
                  <BfwItem
                    key={i}
                    link="/details/series"
                    item={item}
                    type="tv"
                    addBookMark={handleBookmark}
                    bookmarkedIds={bookmarkedIds}
                    favouriteIds={favouriteIds}
                    addFavourite={handleFavourite}
                    watchedIds={watchedIds}
                    addWatched={handleWatched}
                    profilePage={profilePage}
                  />
                );
              })
            ) : (
              <h5 className="mb-3 text-white-50 text-center">No data found</h5>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WatchedList;
