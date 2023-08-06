import { useState } from "react";
import Home from "./pages/Home";
import './index.css';
import Series from "./pages/Series";
import Bookmark from "./pages/Bookmark";
import Movies from "./pages/Movies";
import { Routes, Route } from "react-router-dom";

function App() {

 
  return (
    <>

    <Routes>
            <Route path="/" element={ <Home/> } />
       
            <Route path="/movies" element={ <Movies/> } />
        
            <Route path="/series" element={ <Series/> } />
         
            <Route path="/bookmark" element={ <Bookmark/> } />
         
            </Routes>
  
    </>
  );
  

}

export default App;
