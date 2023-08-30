export const onAir = (page = 1) =>
  fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(data => data)

export const popularSeries = (page = 1) =>
  fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(data => data)

export const topRatedSeries = (page = 1) =>
  fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(data => data)

export const getImage = series_id =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/images?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const getSeriesDetails = series_id =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const getSeriesVideoYoutube = (
  series_id,
  season_number,
  episode_number
) =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}/videos?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const getSeriesVideo = series_id =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const similarSeries = series_id =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const seasonDetails = (series_id, season_number) =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const cast = series_id =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/credits?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const list = async series => {
  let imageArr = []
  for (let data of series) {
    if (data?.backdrop_path && data.backdrop_path !== null) {
      const response = await fetch(
        `https://image.tmdb.org/t/p/original/${data.backdrop_path}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      const image = await response
      if (image?.url) {
        imageArr.push({
          id: data.id,
          title: data.name,
          year:
            data?.first_air_date && new Date(data.first_air_date).getFullYear(),
          rate: data?.vote_average && data.vote_average.toFixed(1),
          image: image.url
        })
      }
    }
  }
  return imageArr
}

export const seasonList = async results => {
  let seasonArr = []
  for (let data of results) {
    if (data?.poster_path && data.poster_path !== null) {
      const response = await fetch(
        `https://image.tmdb.org/t/p/original/${data.poster_path}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      const image = await response
      if (image?.url) {
        seasonArr.push({
          id: data.id,
          title: data.name,
          year: data?.air_date && new Date(data.air_date).getFullYear(),
          season_number: data?.season_number && data.season_number,
          rate: data?.vote_average && data.vote_average.toFixed(1),
          image: image.url
        })
      }
    } else {
      if (data?.id) {
        seasonArr.push({
          id: data.id,
          title: data.name,
          year: data?.air_date && new Date(data.air_date).getFullYear(),
          season_number: data?.season_number && data.season_number,
          rate: data?.vote_average && data.vote_average.toFixed(1),
          image: ''
        })
      }
    }
  }

  return seasonArr
}

export const crewList = async results => {
  let crewArr = []
  for (let data of results) {
    if (data?.profile_path && data.profile_path !== null) {
      const response = await fetch(
        `https://image.tmdb.org/t/p/original${data.profile_path}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      const image = await response
      if (image?.url) {
        crewArr.push({
          id: data.id,
          character: data?.character && data.character,
          name: data?.name && data.name,
          image: image.url
        })
      } else {
        if (data.id) {
          crewArr.push({
            id: data.id,
            character: data?.character && data.character,
            name: data?.name && data.name,
            image: ''
          })
        }
      }
    } else {
      if (data.id) {
        crewArr.push({
          id: data.id,
          character: data?.character && data.character,
          name: data?.name && data.name,
          image: ''
        })
      }
    }
  }

  return crewArr
}

export const Trailer = series_id =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/videos?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const SortByDate = (page, order, year) =>
  fetch(
    `https://api.themoviedb.org/3/discover/tv?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=primary_release_date.${order}&air_date.gte=2010-11-25&air_date.lte=${year}`
  )
    .then(res => res.json())
    .then(data => data)


    export const getGenre = () =>
  fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)


export const SortByGenre = (page,genre) =>
  fetch(
    `https://api.themoviedb.org/3/discover/tv?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}&with_genres=${genre}`
  )
    .then(res => res.json())
    .then(data => data)

    export const SortByGenreAndDate = (page, order, genre, year) =>
  fetch(
    `https://api.themoviedb.org/3/discover/tv?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}&sort_by=primary_release_date.${order}&first_air_date.gte=2010-11-25&first_air_date.lte=${year}&with_genres=${genre}`
  )
    .then(res => res.json())
    .then(data => data)

