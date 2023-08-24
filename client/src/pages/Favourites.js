import React, { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";

import AuthContext from "../helpers/authContext";
import SidebarLayout from "../components/sidebarLayout";
import Search from "../components/search";
import Loading from "../uiElements/preloading";

import * as MovieApi from "../api/MovieApi";
import * as TvSeriesApi from "../api/TvSeriesApi";
import FavouriteItem from "../components/FavouriteItem";

function Favourite(props) {
  const { addBookMark, bookmarkedIds, favouriteIds, addFavourite } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [movieFavourites, setMovieFavourites] = useState([]);
  const [tvFavourites, setTvFavourites] = useState([]);
  const { userId } = useContext(AuthContext);

  let movieArr = useMemo(() => [], []);
  let tvArr = useMemo(() => [], []);

  const handleFavourite = (e, id, type) => {
    e.stopPropagation();
    addFavourite(id, type);

    if (type === "movie") {
      let filteredFavourites = movieFavourites.filter((item) => {
        return item.id !== id;
      });
      setMovieFavourites(filteredFavourites);
    }
    if (type === "tv") {
      let filteredFavourites = tvFavourites.filter((item) => {
        return item.id !== id;
      });
      setTvFavourites(filteredFavourites);
    }
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
      setMovieFavourites(data);
    });
  };

  const loadTvData = async (ids) => {
    setIsLoading(true);
    for (let data of ids) {
      const response = await TvSeriesApi.getSeriesDetails(data).then((tv) => {
        return tv;
      });
      const tv = await response;
      tvArr.push(tv);
    }
    TvSeriesApi.list(tvArr).then((data) => {
      setTvFavourites(data);
    });
    setIsLoading(false);
  };

  const fetchFavourites = async () => {
    try {
      setIsLoading(true);
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/favourites/${userId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (result.data.favourite) {
        let movieFavouritesIds = result.data.favourite
          .filter((item) => item.type === "movie")
          .map((item) => item.favourite_id);

        let tvFavouriteIds = result.data.favourite
          .filter((item) => item.type === "tv")
          .map((item) => item.favourite_id);

        loadMovieData(movieFavouritesIds);
        loadTvData(tvFavouriteIds);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <div className="p-3">
          <Search label="Search for Bookmark" />
          <div className="col-12 mb-4 movieList bookmarks mt-lg-5">
            <div className="row">
              {movieFavourites.length !== 0 && <h3 className="mb-3">Movies</h3>}
              {movieFavourites.length !== 0 &&
                movieFavourites.map((item, i) => {
                  return (
                    <FavouriteItem
                      key={i}
                      link="/details/movies"
                      item={item}
                      type="movie"
                      addBookMark={addBookMark}
                      bookmarkedIds={bookmarkedIds}
                      favouriteIds={favouriteIds}
                      addFavourite={handleFavourite}
                    />
                  );
                })}
            </div>
            <div className="row">
              {tvFavourites.length !== 0 && <h3 className="mb-3">Tv Series</h3>}
              {tvFavourites.length !== 0 &&
                tvFavourites.map((item, i) => {
                  return (
                    <FavouriteItem
                      key={i}
                      link="/details/series"
                      item={item}
                      type="tv"
                      addBookMark={addBookMark}
                      bookmarkedIds={bookmarkedIds}
                      favouriteIds={favouriteIds}
                      addFavourite={handleFavourite}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}

export default Favourite;
