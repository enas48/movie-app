import { useState, useEffect } from 'react'

import Header from '../components/Header'
import Loading from '../uiElements/preloading'
import LoginModal from '../uiElements/loginModal'

export default function Login ({ onLogin }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise(r => setTimeout(r, 1000))
      setLoading(loading => !loading)
    }
    loadData()
  }, [])

  return (
    <>
      {loading && <Loading />}
      <Header />
      <LoginModal onLogin={onLogin} page={true} />
    </>
  )
}
