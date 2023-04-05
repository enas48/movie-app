import MovieForm from "./components/movieform";
function App() {
  const handleAddMovie=()=>{
    
  }
  return (
    <div>
      <MovieForm onAddmovie={handleAddMovie}/>
    
    </div>
  );
}

export default App;
