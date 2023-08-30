export const popularMovies = (page = 1) =>
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
  )
    .then(res => res.json())
    .then(data => data)

export const trendingMovies = (page = 1) =>
  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(data => data)

export const topRatedMovies = (page = 1) =>
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(data => data)

export const upcomingMovies = (page = 1) =>
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(data => data)

export const getGenre = () =>
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const getImage = movie_id =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const getMovieDetails = movie_id =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const getMovieVideo = movie_id =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const similarMovie = movie_id =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const list = async movies => {
  let imageArr = []
  for (let data of movies) {
    if (data?.backdrop_path && data.backdrop_path !== null) {
      const response = await fetch(
        `http://image.tmdb.org/t/p/w780/${data.backdrop_path}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      const image = await response
      if (image?.url) {
        imageArr.push({
          id: data.id,
          genre_ids: data?.genre_ids && data.genre_ids,
          title: data?.title && data.title,
          year: data?.release_date && new Date(data.release_date).getFullYear(),
          rate: data?.vote_average && data.vote_average.toFixed(1),
          image: image.url
        })
      } else {
        if (data?.id) {
          imageArr.push({
            id: data.id,
            genre_ids: data?.genre_ids && data.genre_ids,
            title: data?.title && data.title,
            year:
              data?.release_date && new Date(data.release_date).getFullYear(),
            rate: data?.vote_average && data.vote_average.toFixed(1),
            image: ''
          })
        }
      }
    } else {
      if (data?.id) {
        imageArr.push({
          id: data.id,
          genre_ids: data?.genre_ids && data.genre_ids,
          title: data?.title && data.title,
          year: data?.release_date && new Date(data.release_date).getFullYear(),
          rate: data?.vote_average && data.vote_average.toFixed(1),
          image: ''
        })
      }
    }
  }
  return imageArr
}

export const cast = movie_id =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const Trailer = movie_id =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const Search = query =>
  fetch(
    `https://api.themoviedb.org/3//search/multi?query=${query}&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const SortByDate = (page, order, year) =>
  fetch(
    `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=primary_release_date.${order}&primary_release_date.gte=2010-11-25&primary_release_date.lte=${year}`
  )
    .then(res => res.json())
    .then(data => data)

export const SortByGenre = (page, genre) =>
  fetch(
    `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}&with_genres=${genre}`
  )
    .then(res => res.json())
    .then(data => data)

export const SortByGenreAndDate = (page, order, genre, year) =>
  fetch(
    `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}&sort_by=primary_release_date.${order}&primary_release_date.gte=2010-11-25&primary_release_date.lte=${year}&with_genres=${genre}`
  )
    .then(res => res.json())
    .then(data => data)
