import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import './index.css'

import Home from './pages/Home'
import Series from './pages/series/Series'
import Bookmark from './pages/Bookmark'
import Movies from './pages//movie/Movies'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { Notfound } from './pages/Notfound'
import MovieDetails from './pages/movie/MovieDetails'
import TvDetails from './pages/series/TvDetails'
import SeasonDetails from './pages/series/seasonDetails'

import ProtectedRoute from './helpers/protectedRoute'
import { setAuthToken } from './helpers/setAuthToken'
import AuthContext from './helpers/authContext'

import MessageModal from './uiElements/messageModel'
import Person from './pages/Person'
import SearchItem from './pages/SearchItem'
import * as MovieApi from './api/MovieApi'

function App () {
  const [message, setMessage] = useState({ text: null, state: 'error' })
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserid] = useState(localStorage.getItem('id'))
  const [profile, setProfile] = useState({})
  const [show, setShow] = useState(false)
  const [expireVal, setExpireVal] = useState(
    parseInt(localStorage.getItem('expireVal'))
  )
  const [bookmarkedIds, setBookMarkedId] = useState([])
  const [searchList, setSearchList] = useState([])

  const handleSearch = async query => {
    MovieApi.Search(query).then(data=>{
      console.log(data)
      setSearchList(data.results)
    })
  
  }

  const handleBookmark = (id, type) => {
    id = id.toString()
    if (userId) {
      if (bookmarkedIds.includes(id)) {
        let filteredBookmarks = bookmarkedIds.filter(item => {
          return item !== id
        })
        setBookMarkedId(filteredBookmarks)
        //backend
        deleteBookmark(id)
      } else {
        setBookMarkedId([...bookmarkedIds, id])
        //backend
        addBookmark({ bookmark_id: id, userId: userId, type: type })
      }
    } else {
      //show login modal
      setShow(true)
    }
  }

  const addBookmark = async data => {
    axios
      .post(`${process.env.REACT_APP_APP_URL}/bookmarks`, data)
      .then(response => {
        // console.log(response.data)
      })
      .catch(err => {
        if (err.response.data.message) {
          setMessage({
            text: err.response.data.message || 'something want wrong',
            state: 'error'
          })
        } else {
          setMessage({
            text: err.message || 'something want wrong',
            state: 'error'
          })
        }
      })
  }
  const deleteBookmark = async id => {
    axios
      .delete(`${process.env.REACT_APP_APP_URL}/bookmarks/${userId}/${id}`)
      .then(response => {
        // console.log(response.data)
      })
      .catch(err => {
        if (err.response.data.message) {
          setMessage({
            text: err.response.data.message || 'something want wrong',
            state: 'error'
          })
        } else {
          setMessage({
            text: err.message || 'something want wrong',
            state: 'error'
          })
        }
      })
  }

  const fetchUser = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${userId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.profile) {
        setProfile(result.data.profile)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchBookmarks = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/bookmarks/${userId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.bookmark) {
        let bookMarkedIds = result.data.bookmark.map(item => item.bookmark_id)
        setBookMarkedId(bookMarkedIds)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClear = () => {
    setMessage({ text: null, state: 'error' })
  }

  const handleClose = () => {
    setShow(false)
  }

  const login = data => {
    data = data.data
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data._id)
      localStorage.setItem('expireVal', data.expire)
      setToken(data.token)
      setUserid(localStorage.getItem('id'))
      setExpireVal(data.expire)
      setShow(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUserid(null)
    setAuthToken(null)
    localStorage.clear()
  }

  useEffect(() => {
    if (userId) {
      fetchUser()
      fetchBookmarks()
    }
    //handle expired token
    let today = new Date()
    let expired =
      new Date(new Date().setDate(today.getDate() + expireVal)).getTime() - 10
    if (expired < Date.now()) {
      logout()
    }
  }, [expireVal, userId, show,searchList])

  if (token) {
    setAuthToken(token)
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      {message.text && <MessageModal message={message} onClear={handleClear} />}
      <>
        <Routes>
          <Route path='/' element={<Home onLogout={logout} />} />
          <Route
            path='/movies'
            element={
              <Movies
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                onLogout={logout}
                show={show}
                handleClose={handleClose}
                handleSearch={handleSearch}
                onLogin={login}
                searchList={searchList}
              />
            }
          />
          <Route
            path='/series'
            element={
              <Series
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                onLogout={logout}
                show={show}
                handleClose={handleClose}
                onLogin={login}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute isAllowed={!!token}>
                <Profile onLogout={logout} profile={profile.profile} />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path='/bookmark'
            element={
              <ProtectedRoute isAllowed={!!token}>
                <Bookmark
                  bookmarkedIds={bookmarkedIds}
                  addBookMark={handleBookmark}
                  onLogout={logout}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='details/movies/:id'
            element={
              <MovieDetails
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                show={show}
                handleClose={handleClose}
                onLogin={login}
                onLogout={logout}
              />
            }
          />
          <Route
            path='details/series/:id'
            element={
              <TvDetails
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                show={show}
                handleClose={handleClose}
                onLogin={login}
                onLogout={logout}
              />
            }
          />
          <Route
            path='season/:id/:seasonNum'
            element={
              <SeasonDetails
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                show={show}
                handleClose={handleClose}
                onLogin={login}
                onLogout={logout}
              />
            }
          />
          <Route
            path='person/:id'
            element={
              <Person
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                show={show}
                handleClose={handleClose}
                onLogin={login}
                onLogout={logout}
              />
            }
          />
          <Route
            path='/search/:id'
            element={
              <SearchItem
                searchList={searchList}
                bookmarkedIds={bookmarkedIds}
                addBookMark={handleBookmark}
                show={show}
                handleClose={handleClose}
                onLogin={login}
                onLogout={logout}
              />
            }
          />
          <Route path='/login' element={<Login onLogin={login} />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </>
    </AuthContext.Provider>
  )
}

export default App
