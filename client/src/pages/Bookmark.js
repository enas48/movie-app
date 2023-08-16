import React, { useContext } from "react";
import SidebarLayout from "../components/sidebarLayout";
import { useState, useEffect, useMemo } from "react";
import Loading from "../uiElements/preloading";
import Search from "../components/search";
import * as MovieApi from "../api/MovieApi";
import { LinkContainer } from "react-router-bootstrap";
import {
  MdLocalMovies,
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdStar,
} from "react-icons/md";
import * as MovieList from "../helpers/fetchImages";
import axios from "axios";
import AuthContext from "../helpers/authContext";
function Bookmark(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const { userId } = useContext(AuthContext);

  let movieArr = useMemo(() => [], []);

  const handleBookmark = (e, id) => {
    e.stopPropagation();
    props.addBookMark(id);
    let filteredBookmarks = bookmarks.filter((item) => {
      return item.id !== id;
    });
    setBookmarks(filteredBookmarks);
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
        let bookMarkedIds = result.data.bookmark.map(
          (item) => item.bookmark_id
        );
        loadData(bookMarkedIds);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadData = async (ids) => {
    for (let data of ids) {
      const response = await MovieApi.getMovieDetails(data).then((movie) => {
        return movie;
      });
      const movie = await response;
      console.log(movie);
      movieArr.push(movie);
    }

    MovieList.list(movieArr).then((data) => {
      setBookmarks(data);
    });
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
          <div className="col-12 mb-4 movieList">
            <div className="row">
              {bookmarks.length !== 0 &&
                bookmarks.map((item, i) => {
                  return (
                    <div key={i} className="col-sm-6 col-md-4 mb-4">
                      <LinkContainer
                        to={`/details/movies/${item.id}`}
                        onClick={() =>
                          (window.location.href = `/details/movies/${item.id}`)
                        }
                      >
                        <div
                          className={`
                    ${props.kind === "trending" ? "pc" : ""}
                    card trending   d-flex flex-column justify-content-between`}
                        >
                          <img src={item.image} alt={item.title} />
                          <div className="overlay"></div>
                          <div className="d-flex align-items-center gap-1">
                            <MdStar className="text-warning" /> {item.rate}
                            <button
                              onClick={(e) => handleBookmark(e, item.id)}
                              className="btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 "
                            >
                              {props.bookmarkedIds.includes(
                                item.id.toString()
                              ) ? (
                                <MdOutlineBookmark className="bookmark_icon" />
                              ) : (
                                <MdOutlineBookmarkBorder className="bookmark_icon" />
                              )}
                            </button>
                          </div>
                          <div className="d-flex   flex-column ">
                            <div className="d-flex gap-2">
                              <span>{item.year}</span>
                              <span>
                                <MdLocalMovies /> {item.type}
                              </span>
                            </div>
                            <h5>
                              {item.title.length > 20
                                ? item.title.slice(0, 30 - 1) + "…"
                                : item.title}
                            </h5>
                          </div>
                        </div>
                      </LinkContainer>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}

export default Bookmark;
