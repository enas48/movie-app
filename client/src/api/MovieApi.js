export const trendingMovies = (page = 1) =>
  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
  )
    .then((res) => res.json())
    .then((data) => data);

export const popularMovies = (page = 1, country = "US") => {
  if (country !== "US") {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&include_video=false&language=en-US&page=${page}&with_origin_country=${country}&sort_by=popularity.desc`
    )
      .then((res) => res.json())
      .then((data) => data);
  } else {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => data);
  }
};

export const topRatedMovies = (page = 1, country = "US") => {
  if (country !== "US") {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&include_video=false&language=en-US&page=${page}&with_origin_country=${country}&sort_by=vote_average.desc`
    )
      .then((res) => res.json())
      .then((data) => data);
  } else {
    return fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => data);
  }
};

export const upcomingMovies = (page = 1, country = "US") => {
  if (country !== "US") {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&include_video=false&language=en-US&page=${page}&with_origin_country=${country}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=2023-01-01&release_date.lte=2024-11-25`
    )
      .then((res) => res.json())
      .then((data) => data);
  } else {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => data);
  }
};

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

export const getMovieVideo = (movie_id) =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const similarMovie = (movie_id) =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const list = async (movies) => {
  let imageArr = [];
  for (let data of movies) {
    if (data?.backdrop_path && data.backdrop_path !== null) {
      const response = await fetch(
        `https://image.tmdb.org/t/p/w780/${data.backdrop_path}`
      );
      const image = await response;
      if (image?.url) {
        imageArr.push({
          id: data.id,
          genre_ids: data?.genre_ids && data.genre_ids,
          title: data?.title && data.title,
          year: data?.release_date && new Date(data.release_date).getFullYear(),
          rate: data?.vote_average && data.vote_average.toFixed(1),
          image: image.url,
        });
      } else {
        if (data?.id) {
          imageArr.push({
            id: data.id,
            genre_ids: data?.genre_ids && data.genre_ids,
            title: data?.title && data.title,
            year:
              data?.release_date && new Date(data.release_date).getFullYear(),
            rate: data?.vote_average && data.vote_average.toFixed(1),
            image: "",
          });
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
          image: "",
        });
      }
    }
  }
  return imageArr;
};

export const cast = (movie_id) =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const Trailer = (movie_id) =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => data);

export const Search = (query) =>
  fetch(
    `https://api.themoviedb.org/3//search/multi?query=${query}&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5`
  )
    .then((res) => res.json())
    .then((data) => data);

export const SortByDate = (page, order, country) =>
  fetch(
    `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&include_video=false&language=en-US&page=${page}&with_origin_country=${country}&sort_by=primary_release_date.${order}`
  )
    .then((res) => res.json())
    .then((data) => data);

export const SortByGenreAndDate = (page, order, genre, country, type) => {
  if (order === "all") {
    if (type === "topRated") {
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&page=${page}&with_origin_country=${country}&with_genres=${genre}&sort_by=vote_average.desc`
      )
        .then((res) => res.json())
        .then((data) => data);
    } else if (type === "upcoming") {
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&page=${page}&with_origin_country=${country}&with_genres=${genre}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=2023-01-01&release_date.lte=2024-11-25`
      )
        .then((res) => res.json())
        .then((data) => data);
    } else {
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&page=${page}&with_origin_country=${country}&with_genres=${genre}&sort_by=popularity.desc`
      )
        .then((res) => res.json())
        .then((data) => data);
    }
  } else {
    if (type === "topRated") {
      console.log(type);
      console.log(order);
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&language=en-US&page=${page}&with_origin_country=${country}&sort_by=primary_release_date.${order}&sort_by=vote_average.desc&with_genres=${genre}`
      )
        .then((res) => res.json())
        .then((data) => data);
    } else if (type === "upcoming") {
      console.log(type);
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&language=en-US&page=${page}&with_origin_country=${country}&sort_by=primary_release_date.${order}&with_release_type=2|3&release_date.gte=2023-01-01&release_date.lte=2024-11-25&with_genres=${genre}`
      )
        .then((res) => res.json())
        .then((data) => data);
    } else {
      console.log(type);
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&language=en-US&page=${page}&with_origin_country=${country}&sort_by=primary_release_date.${order}&with_genres=${genre}`
      )
        .then((res) => res.json())
        .then((data) => data);
    }
    // return fetch(
    //   `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&page=${page}&with_origin_country=${country}&sort_by=primary_release_date.${order}&with_genres=${genre}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => data);
  }
};

export const getCountries = () =>
  fetch(
    `https://api.themoviedb.org/3/configuration/countries?api_key=${process.env.REACT_APP_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => data);
