import { useState } from "react";
import Home from "./pages/Home";
import './index.css';
import Series from "./pages/Series";
import Upcoming from "./pages/Upcoming";
import Movies from "./pages/Movies";
import { Routes, Route } from "react-router-dom"
function App() {
  const[loading,setLoading]=useState(true);
  const spinner=document.getElementById('spinner');
  if(spinner){
    setTimeout(()=>{
      spinner.style.display="none";
      setLoading(false);
    },2000)
  }
 
  return (
    <>
    {!loading &&(
    <Routes>
            <Route path="/" element={ <Home/> } />
       
            <Route path="/movies" element={ <Movies/> } />
        
            <Route path="/series" element={ <Series/> } />
         
            <Route path="/upcoming" element={ <Upcoming/> } />
         
            </Routes>
  
    )}
    </>
  );
  

}

export default App;
