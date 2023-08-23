import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { PiTelevisionBold } from "react-icons/pi";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../uiElements/preloading";
import MovieDetails from "./movie/MovieDetails";
import TvDetails from "./series/TvDetails";
import Person from "./Person";

function SearchItem(props) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { data } = location.state;

  const [type, setType] = useState("");
  useEffect(() => {
    setIsLoading(true);
    setType(data.media_type);
    setIsLoading(false);
  }, [data]);

  return (
    <>
      {isLoading && <Loading />}
      {type === "movie" && (
        <MovieDetails
          bookmarkedIds={props.bookmarkedIds}
          addBookMark={props.addBookMark}
          favouriteIds={props.favouriteIds}
          addFavourite={props.addFavourite}
          show={props.show}
          handleClose={props.handleClose}
         
        
        />
      )}
      {type === "tv" && (
        <TvDetails
          bookmarkedIds={props.bookmarkedIds}
          addBookMark={props.addBookMark}
          favouriteIds={props.favouriteIds}
          addFavourite={props.addFavourite}
          show={props.show}
          handleClose={props.handleClose}
        
         
        />
      )}
      {type === "person" && (
        <Person
          bookmarkedIds={props.bookmarkedIds}
          addBookMark={props.addBookMark}
          favouriteIds={props.favouriteIds}
          addFavourite={props.addFavourite}
          show={props.show}
          handleClose={props.handleClose}
        
        />
      )}
      {type !== "movie" || type !== "tv" || (type !== "person" && "no result")}
    </>
  );
}

export default SearchItem;
