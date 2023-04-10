import Home from "./pages/Home";
import './index.css';
import Series from "./pages/Series";
import Upcoming from "./pages/Upcoming";
import Movies from "./pages/Movies";
import { Routes, Route } from "react-router-dom"
function App() {
 
  return (
    <Routes>
            <Route path="/" element={ <Home/> } />
       
            <Route path="/movies" element={ <Movies/> } />
        
            <Route path="/series" element={ <Series/> } />
         
            <Route path="/upcoming" element={ <Upcoming/> } />
         
            </Routes>
  );
}

export default App;
