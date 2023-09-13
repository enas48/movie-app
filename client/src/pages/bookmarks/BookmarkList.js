import React, { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import Loading from "../../components/uiElements/preloading";
import * as MovieApi from "../../api/MovieApi";
import * as TvSeriesApi from "../../api/TvSeriesApi";
import BfwItem from "../../components/bookFavWatch/BfwItem";
import AuthContext from "../../helpers/authContext";

function BookmarkList(props) {
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
  const [movieBookmarks, setMovieBookmarks] = useState([]);
  const [tvBookmarks, setTvBookmarks] = useState([]);
  const { userId } = useContext(AuthContext);

  let movieArr = useMemo(() => [], []);
  let tvArr = useMemo(() => [], []);

  console.log(profileUserId);
  console.log(userId === profileUserId);
  const handleBookmark = (e, id, type) => {
    e.stopPropagation();
    addBookMark(id, type);
    if (!profilePage || userId === profileUserId) {
      console.log("y");
      if (type === "movie") {
        let filteredBookmarks = movieBookmarks.filter((item) => {
          return item.id !== id;
        });
        setMovieBookmarks(filteredBookmarks);
      }
      if (type === "tv") {
        let filteredBookmarks = tvBookmarks.filter((item) => {
          return item.id !== id;
        });
        setTvBookmarks(filteredBookmarks);
      }
    }
  };
  const handleFavourite = (e, id, type) => {
    e.stopPropagation();
    addFavourite(id, type);
  };
  const handleWatched = (e, id, type) => {
    e.stopPropagation();
    addWatched(id, type);
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
      setMovieBookmarks(data);
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
      setTvBookmarks(data);
    });
  };

  const fetchBookmarks = async () => {
    try {
      setIsLoading(true)
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/bookmarks/${profileUserId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (result.data.bookmark) {
        let movieBookMarkedIds = result.data.bookmark
          .filter((item) => item.type === "movie")
          .map((item) => item.bookmark_id);

        let tvBookMarkedIds = result.data.bookmark
          .filter((item) => item.type === "tv")
          .map((item) => item.bookmark_id);

        loadMovieData(movieBookMarkedIds);
        loadTvData(tvBookMarkedIds);
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <>
     {isLoading ? (
        <Loading content={true} />
      ) : (
      <div className="col-12 mb-4 movieList bookmarks ">
        <div className="row">
          <h3 className="mb-3">Movies</h3>
          {movieBookmarks.length !== 0 ? (
            movieBookmarks.map((item, i) => {
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
          {tvBookmarks.length !== 0 ? (
            tvBookmarks.map((item, i) => {
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

export default BookmarkList;
