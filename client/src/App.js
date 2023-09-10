import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import "./index.css";

/*pages*/
import Home from "./pages/home/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import Profile from "./pages/Profile";
import SearchList from "./pages/search/SearchList";
import Movies from "./pages//movie/Movies";
import MovieDetails from "./pages/movie/MovieDetails";
import AllMovies from "./pages/movie/allmovies/AllMovies";
import Movie from "./pages/movie/allmovies/Movie";
import Series from "./pages/series/Series";
import TvDetails from "./pages/series/TvDetails";
import SeasonDetails from "./pages/series/seasonDetails";
import AllSeries from "./pages/series/allseries/AllSeries";
import Tv from "./pages/series/allseries/Tv";
import Person from "./pages/Person";
import Bookmark from "./pages/Bookmark";
import Favourite from "./pages/Favourites";
import Watched from "./pages/Watched";

/*helpers*/
import ProtectedRoute from "./helpers/protectedRoute";
import { setAuthToken } from "./helpers/setAuthToken";
import AuthContext from "./helpers/authContext";

/*component*/
import MessageModal from "./components/uiElements/messageModel";
import SearchItem from "./components/search/SearchItem";

function App() {
  const [message, setMessage] = useState({ text: null, state: "error" });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserid] = useState(localStorage.getItem("id"));
  const [profile, setProfile] = useState({});
  const [show, setShow] = useState(false);
  const [expireVal, setExpireVal] = useState(
    parseInt(localStorage.getItem("expireVal"))
  );
  const [bookmarkedIds, setBookMarkedId] = useState([]);
  const [favouritedIds, setFavouriteId] = useState([]);
  const [watchedIds, setWatchedId] = useState([]);

  const handleBookmark = (id, type) => {
    id = id.toString();
    if (userId) {
      if (bookmarkedIds.includes(id)) {
        let filteredBookmarks = bookmarkedIds.filter((item) => {
          return item !== id;
        });
        setBookMarkedId(filteredBookmarks);
        //backend
        deleteItem(id, "bookmarks", bookmarkedIds);
      } else {
        setBookMarkedId([...bookmarkedIds, id]);
        //backend
        addItem(
          { bookmark_id: id, userId: userId, type: type },
          "bookmarks",
          bookmarkedIds,
          id
        );
      }
    } else {
      //show login modal
      setShow(true);
    }
  };
  const handleFavourite = (id, type) => {
    id = id.toString();
    if (userId) {
      if (favouritedIds.includes(id)) {
        let filteredFavourites = favouritedIds.filter((item) => {
          return item !== id;
        });
        setFavouriteId(filteredFavourites);
        //backend
        deleteItem(id, "favourites", favouritedIds);
      } else {
        setFavouriteId([...favouritedIds, id]);
        //backend
        addItem(
          { favourite_id: id, userId: userId, type: type },
          "favourites",
          favouritedIds,
          id
        );
      }
    } else {
      //show login modal
      setShow(true);
    }
  };

  const handleWatched = (id, type) => {
    id = id.toString();
    if (userId) {
      if (watchedIds.includes(id)) {
        let filteredWatched = watchedIds.filter((item) => {
          return item !== id;
        });
        setWatchedId(filteredWatched);
        //backend
        deleteItem(id, "watched", watchedIds);
      } else {
        setWatchedId([...watchedIds, id]);
        //backend
        addItem(
          { watched_id: id, userId: userId, type: type },
          "watched",
          watchedIds,
          id
        );
      }
    } else {
      //show login modal
      setShow(true);
    }
  };

  //add bookmark or favourite or watched to backend
  const addItem = async (data, type, ids, id) => {
    axios
      .post(`${process.env.REACT_APP_APP_URL}/${type}`, data)
      .then((response) => {})
      .catch((err) => {
        if (err.response?.data.message) {
          setMessage({
            text: err.response.data.message || "something want wrong",
            state: "error",
          });
        } else {
          setMessage({
            text: err.message || "something want wrong",
            state: "error",
          });
        }
        let filtered = ids.filter((item) => {
          return item !== id;
        });
        if (type === "favourites") setFavouriteId(filtered);
        if (type === "bookmarks") setBookMarkedId(filtered);
        if (type === "watched") setWatchedId(filtered);
      });
  };
  //delete bookmark or favourite or watched to backend
  const deleteItem = async (id, type, ids) => {
    axios
      .delete(`${process.env.REACT_APP_APP_URL}/${type}/${userId}/${id}`)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
        if (err.response?.data.message) {
          setMessage({
            text: err.response.data.message || "something want wrong",
            state: "error",
          });
        } else {
          setMessage({
            text: err.message || "something want wrong",
            state: "error",
          });
        }
        if (type === "favourites") setFavouriteId(ids);
        if (type === "bookmarks") setBookMarkedId(ids);
        if (type === "watched") setWatchedId(ids);
      });
  };

  //fetch bookmarks and favourites
  const fetchItems = async (type) => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/${type}/${userId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (type === "bookmarks" && result.data.bookmark) {
        let bookMarkedIds = result.data.bookmark.map(
          (item) => item.bookmark_id
        );
        setBookMarkedId(bookMarkedIds);
      }
      if (type === "favourites" && result.data.favourite) {
        let favouriteIds = result.data.favourite.map(
          (item) => item.favourite_id
        );
        setFavouriteId(favouriteIds);
      }
      if (type === "watched" && result.data.watched) {
        let watchedIds = result.data.watched.map((item) => item.watched_id);
        setWatchedId(watchedIds);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${userId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (result.data.profile) {
        setProfile(result.data.profile);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = () => {
    setMessage({ text: null, state: "error" });
  };

  const handleClose = () => {
    setShow(false);
  };

  const login = (data) => {
    data = data.data;
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data._id);
      localStorage.setItem("expireVal", data.expire);
      setToken(data.token);
      setUserid(localStorage.getItem("id"));
      setExpireVal(data.expire);
      setShow(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUserid(null);
    setAuthToken(null);
    setBookMarkedId([]);
    setFavouriteId([]);
    localStorage.clear();
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
      fetchItems("bookmarks");
      fetchItems("favourites");
      fetchItems("watched");
    }
    //handle expired token
    let today = new Date();
    let expired =
      new Date(new Date().setDate(today.getDate() + expireVal)).getTime() - 10;
    if (expired < Date.now()) {
      logout();
    }
  }, [expireVal, userId, show]);

  if (token) {
    setAuthToken(token);
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      {message.text && <MessageModal message={message} onClear={handleClear} />}
      <>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <Movies
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          />
          <Route
            path="allmovies"
            element={
              <AllMovies
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          >
            <Route
              index
              element={
                <Movie
                  bookmarkedIds={bookmarkedIds}
                  addBookMark={handleBookmark}
                  favouriteIds={favouritedIds}
                  addFavourite={handleFavourite}
                  watchedIds={watchedIds}
                  addWatched={handleWatched}
                  show={show}
                  handleClose={handleClose}
                />
              }
            />
            <Route
              path=":type"
              element={
                <Movie
                  bookmarkedIds={bookmarkedIds}
                  addBookMark={handleBookmark}
                  favouriteIds={favouritedIds}
                  addFavourite={handleFavourite}
                  watchedIds={watchedIds}
                  addWatched={handleWatched}
                  show={show}
                  handleClose={handleClose}
                />
              }
            />
          </Route>
          <Route
            path="/series"
            element={
              <Series
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          />
          <Route
            path="allSeries"
            element={
              <AllSeries
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          >
            <Route
              index
              element={
                <Tv
                  bookmarkedIds={bookmarkedIds}
                  addBookMark={handleBookmark}
                  favouriteIds={favouritedIds}
                  addFavourite={handleFavourite}
                  watchedIds={watchedIds}
                  addWatched={handleWatched}
                  show={show}
                  handleClose={handleClose}
                />
              }
            />
            <Route
              path=":type"
              element={
                <Tv
                  bookmarkedIds={bookmarkedIds}
                  addBookMark={handleBookmark}
                  favouriteIds={favouritedIds}
                  addFavourite={handleFavourite}
                  watchedIds={watchedIds}
                  addWatched={handleWatched}
                  show={show}
                  handleClose={handleClose}
                />
              }
            />
          </Route>
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute isAllowed={!!token}>
                <Profile onLogout={logout} profile={profile.profile} />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute isAllowed={!!token}>
                <Bookmark
                  bookmarkedIds={bookmarkedIds}
                  addBookMark={handleBookmark}
                  favouriteIds={favouritedIds}
                  addFavourite={handleFavourite}
                  watchedIds={watchedIds}
                  addWatched={handleWatched}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favourite"
            element={
              <ProtectedRoute isAllowed={!!token}>
                <Favourite
                  bookmarkedIds={bookmarkedIds}
                  addBookMark={handleBookmark}
                  favouriteIds={favouritedIds}
                  addFavourite={handleFavourite}
                  watchedIds={watchedIds}
                  addWatched={handleWatched}
                />
              </ProtectedRoute>
            }
          />
                 <Route
            path="/watched"
            element={
              <ProtectedRoute isAllowed={!!token}>
                <Watched
                  bookmarkedIds={bookmarkedIds}
                  addBookMark={handleBookmark}
                  favouriteIds={favouritedIds}
                  addFavourite={handleFavourite}
                  watchedIds={watchedIds}
                  addWatched={handleWatched}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="details/movies/:id"
            element={
              <MovieDetails
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          />
          <Route
            path="details/series/:id"
            element={
              <TvDetails
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          />
          <Route
            path="season/:id/:seasonNum"
            element={
              <SeasonDetails
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          />
          <Route
            path="person/:id"
            element={
              <Person
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          />
          <Route
            path="/search/:media_type/:id"
            element={
              <SearchItem
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          />
          <Route
            path="/search/:query"
            element={
              <SearchList
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                favouriteIds={favouritedIds}
                addFavourite={handleFavourite}
                watchedIds={watchedIds}
                addWatched={handleWatched}
                show={show}
                handleClose={handleClose}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </>
    </AuthContext.Provider>
  );
}

export default App;
