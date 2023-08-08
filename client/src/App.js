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

function App () {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserid] = useState(localStorage.getItem('id'))
  const[profile,setProfile]=useState({})
  const [expireVal, setExpireVal] = useState(
    parseInt(localStorage.getItem('expireVal'))
  )
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
  useEffect(() => {
    if (userId) {
      fetchUser()
    }

    let today = new Date()
    let expired =
      new Date(new Date().setDate(today.getDate() + expireVal)).getTime() - 10

    if (expired < Date.now()) {
      logout()
    }
  }, [expireVal])

  const login = data => {
    console.log(data)
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
      <>
        <Routes>
          <Route path='/' element={<Home onLogout={logout} />} />
          <Route path='/movies' element={<Movies onLogout={logout} />} />
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

          <Route path='/login' element={<Login onLogin={login} />} />

          <Route path='/register' element={<Register />} />

          <Route path='*' element={<Notfound />} />
        </Routes>
      </>
    </AuthContext.Provider>
  )
}

export default App
