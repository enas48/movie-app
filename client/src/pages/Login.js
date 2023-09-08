import { useState, useEffect, useContext } from "react";

import Header from "../components/header/Header";
import Loading from "../components/uiElements/preloading";
import LoginModal from "../components/uiElements/loginModal";
import AuthContext from "../helpers/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setLoading((loading) => !loading);
    };
    loadData();
    if (userId) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Header />
      <LoginModal page={true} />
    </>
  );
}
