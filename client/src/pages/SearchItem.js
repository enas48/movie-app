import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { PiTelevisionBold } from "react-icons/pi";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../uiElements/preloading";
import MovieDetails from "./movie/MovieDetails";
import TvDetails from "./series/TvDetails";
import Person from "./Person";

function SearchItem(props) {
  const {media_type} = useParams();
  const [isLoading, setIsLoading] = useState(true);
console.log(media_type)


  const [type, setType] = useState("");
  useEffect(() => {
    setIsLoading(true);
    setType(media_type);
    setIsLoading(false);
  }, []);

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
