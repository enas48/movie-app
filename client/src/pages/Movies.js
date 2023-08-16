import React, { useEffect, useState } from "react";
import SidebarLayout from "../components/sidebarLayout";
import Loading from "../uiElements/preloading";
import Search from "../components/search";
import MovieListKind from "../components/MovieListKind";

function Movies(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // Wait for two second
      await new Promise((r) => setTimeout(r, 1000));
      // Toggle loading state
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <div className="p-3">
          <Search label="Search for Movie" />
          <MovieListKind
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind="trending"
          />
          <MovieListKind
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind="topRated"
          />
          <MovieListKind
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            kind="upcoming"
          />
        </div>
      </SidebarLayout>
    </>
  );
}

export default Movies;