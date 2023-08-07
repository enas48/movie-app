import { useState, useEffect } from 'react'
import Home from './pages/Home'
import './index.css'
import Series from './pages/Series'
import Bookmark from './pages/Bookmark'
import Movies from './pages/Movies'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './helpers/protectedRoute'
import { setAuthToken } from './helpers/setAuthToken'

function App () {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const [expireVal, setExpireVal] = useState(
    parseInt(localStorage.getItem('expireVal'))
  )

  useEffect(() => {
    let today = new Date()
      let expired =
        new Date(new Date().setDate(today.getDate() + expireVal)).getTime() - 10
  
      if (expired < Date.now()) {
        // localStorage.removeItem('expireVal');
        logout()
      }
   
 
  }, [expireVal])

  const login = data => {
    console.log(data)
    data = data.data
    if (data.token) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
      localStorage.setItem('expireVal', data.expire)
      setExpireVal(data.expire)
    }
  }

  if (token) {
    setAuthToken(token)
  }

  const logout = () => {
    setToken(null)
    setAuthToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expireVal')
  }
  return (
    <>
      <Routes>
        <Route path='/' logOut={logout} element={<Home />} />

        <Route path='/movies' logOut={logout} element={<Movies />} />

        <Route path='/series' logOut={logout} element={<Series />} />
        <Route
          path='/bookmark'
          element={
            <ProtectedRoute isAllowed={!!token}>
              <Bookmark logOut={logout} />
            </ProtectedRoute>
          }
        />

        <Route path='/login' element={<Login onLogin={login} />} />

        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
