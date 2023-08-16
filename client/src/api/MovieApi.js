export const popularMovies = () =>
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=1`
  )
    .then((res) => res.json())
    .then((data) => data);

export const trendingMovies = () =>
  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const topRatedMovies = () =>
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const upcomingMovies = () =>
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const getGenre = () =>
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const getImage = (movie_id) =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const getMovieDetails = (movie_id) =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const getSeriesDetails = (series_id) =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const getMovieVideo = (movie_id) =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const getSeriesVideo = (series_id) =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/video?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

    export const similarMovie = (movie_id) =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);
    
    export const similarSeries = (series_id) =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);
