
export const popularMovies = () =>
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => res.json())
    .then(data => data)

    
export const trendingMovies = () =>
fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
  .then(res => res.json())
  .then(data => data)

  export const getGenre = () =>
fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en`)
  .then(res => res.json())
  .then(data => data)
