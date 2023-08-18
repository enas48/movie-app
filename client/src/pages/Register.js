import { useState, useEffect } from 'react'
import Loading from '../uiElements/preloading'
import Header from '../components/Header'
import SignupModal from '../uiElements/SignupModal'

export default function Register () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // Wait for two second
      await new Promise(r => setTimeout(r, 1000))
      // Toggle loading state
      setLoading(loading => !loading)
    }
    loadData()
  }, [])


    return (
      <>
       {loading && <Loading/>}
        <Header />
        <SignupModal page={true}  />
      </>
    )
  }

