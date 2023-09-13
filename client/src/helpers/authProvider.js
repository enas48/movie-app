import { useState, useEffect } from 'react'
import AuthContext from './authContext'
import axios from 'axios'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('id')
    const [profile, setProfile] = useState(null)
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
          console.log(result.data)
          setProfile(result.data.profile)
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (token) {
      setUser({ loggedin: true, userId: userId ,userProfile:profile})
      fetchUser()
    }
  }, [])
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
