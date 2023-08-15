import { useState, useEffect } from 'react'
import './index.css'
import Home from './pages/Home'
import Series from './pages/Series'
import Bookmark from './pages/Bookmark'
import Movies from './pages/Movies'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { Notfound } from './pages/Notfound'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './helpers/protectedRoute'
import { setAuthToken } from './helpers/setAuthToken'
import AuthContext from './helpers/authContext'
import axios from 'axios'
import MessageModal from './uiElements/messageModel'
import Details from './pages/Details'

function App () {
  const [message, setMessage] = useState({ text: null, state: 'error' })
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserid] = useState(localStorage.getItem('id'))
  const [profile, setProfile] = useState({})
  const [expireVal, setExpireVal] = useState(
    parseInt(localStorage.getItem('expireVal'))
  )
  const [bookmarkedIds, setBookMarkedId] = useState([])
  const handleBookmark = id => {
    console.log(id)
    id=id.toString();
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
      addBookmark({ bookmark_id: id, userId: userId })
      // fetchBookmarks()
    }
  }
  const addBookmark = async data => {
    console.log(data)
    axios
      .post(`${process.env.REACT_APP_APP_URL}/bookmarks`, data)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
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
    console.log(id)
    axios
      .delete(`${process.env.REACT_APP_APP_URL}/bookmarks/${userId}/${id}`)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
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
  const handleClear = () => {
    setMessage({ text: null, state: 'error' })
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
      //get user
      console.log(result.data)
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
      //get user
      console.log(result.data)
      if (result.data.bookmark) {
        let bookMarkedIds = result.data.bookmark.map(item =>
        item.bookmark_id
        )
        console.log(bookMarkedIds)
        setBookMarkedId(bookMarkedIds)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (userId) {
      fetchUser()
      fetchBookmarks()
    }

    let today = new Date()
    let expired =
      new Date(new Date().setDate(today.getDate() + expireVal)).getTime() - 10

    if (expired < Date.now()) {
      logout()
    }
  }, [expireVal, userId])

  const login = data => {
    data = data.data
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data._id)
      localStorage.setItem('expireVal', data.expire)
      setToken(data.token)
      setUserid(localStorage.getItem('id'))
      setExpireVal(data.expire)
    }
  }

  if (token) {
    setAuthToken(token)
  }

  const logout = () => {
    setToken(null)
    setUserid(null)
    setAuthToken(null)
    localStorage.clear()
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
              />
            }
          />
          <Route path='/series' element={<Series onLogout={logout} />} />
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
                <Bookmark onLogout={logout} />
              </ProtectedRoute>
            }
          />
           <Route path="details/:type/:id" element={<Details />} />

          <Route path='/login' element={<Login onLogin={login} />} />

          <Route path='/register' element={<Register />} />

          <Route path='*' element={<Notfound />} />
        </Routes>
      </>
    </AuthContext.Provider>
  )
}

export default App
