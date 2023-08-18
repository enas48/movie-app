export const onAir = () =>
  fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const popularSeries = () =>
  fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=1`
  )
    .then((res) => res.json())
    .then((data) => data);


export const topRatedSeries = () =>
  fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);


export const getImage = (series_id) =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/images?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);


export const getSeriesDetails = (series_id) =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);



export const getSeriesVideo = (series_id) =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/video?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

    export const similarSeries = (series_id) =>
  fetch(
    `https://api.themoviedb.org/3/tv/${series_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

    export const seasonDetails= (series_id,season_number) =>
    fetch(
      `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => data);
  