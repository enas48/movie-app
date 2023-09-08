import { useState, useEffect,useContext } from 'react'

import Header from '../components/header/Header'
import Loading from '../components/uiElements/preloading'
import SignupModal from '../components/uiElements/SignupModal'
import AuthContext from "../helpers/authContext";
import { useNavigate } from "react-router-dom";

export default function Register (props) {
  const [loading, setLoading] = useState(true)
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      await new Promise(r => setTimeout(r, 1000))
      setLoading(loading => !loading)
    }
    loadData()
    if (userId) {
      navigate("/", { replace: true });
    }
  }, [])

  return (
    <>
      {loading && <Loading />}
      <Header  />
      <SignupModal page={true} />
    </>
  )
}
