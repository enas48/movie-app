import React, { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";

import AuthContext from "../helpers/authContext";
import SidebarLayout from "../components/sidebar/sidebarLayout";
import Search from "../components/search/search";
import Loading from "../components/uiElements/preloading";

import * as MovieApi from "../api/MovieApi";
import * as TvSeriesApi from "../api/TvSeriesApi";
import BfwItem from "../components/bookFavWatch/BfwItem";

function Bookmark(props) {
  const { addBookMark, bookmarkedIds, favouriteIds, addFavourite } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [movieBookmarks, setMovieBookmarks] = useState([]);
  const [tvBookmarks, setTvBookmarks] = useState([]);
  const { userId } = useContext(AuthContext);

  let movieArr = useMemo(() => [], []);
  let tvArr = useMemo(() => [], []);

  const handleBookmark = (e, id, type) => {
    e.stopPropagation();
    addBookMark(id, type);

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
      setIsLoading(true);
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/bookmarks/${userId}`,
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
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <div className="p-3">
          <Search label="Search for Bookmark" />
          <div className="col-12 mb-4 movieList bookmarks mt-lg-5">
            <div className="row">
              {movieBookmarks.length !== 0 && <h3 className="mb-3">Movies</h3>}
              {movieBookmarks.length !== 0 &&
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
                    />
                  );
                })}
            </div>
            <div className="row">
              {tvBookmarks.length !== 0 && <h3 className="mb-3">Tv Series</h3>}
              {tvBookmarks.length !== 0 &&
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
                    />
                  );
                })}
            </div>
            <div className="row">
              {tvBookmarks.length === 0 && movieBookmarks.length === 0 && (
                <h3 className="mb-3">No Bookmarks found</h3>
              )}
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}

export default Bookmark;
