export const trendingMovies = (page = 1) =>
  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(data => data)

export const popularMovies = (page = 1, country = 'US') => {
  if (country !== 'US') {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&include_video=false&language=en-US&page=${page}&with_origin_country=${country}&sort_by=popularity.desc`
    )
      .then(res => res.json())
      .then(data => data)
  } else {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
    )
      .then(res => res.json())
      .then(data => data)
  }
}

export const topRatedMovies = (page = 1, country = 'US') => {
  if (country !== 'US') {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&include_video=false&language=en-US&page=${page}&with_origin_country=${country}&sort_by=vote_average.desc`
    )
      .then(res => res.json())
      .then(data => data)
  } else {
    return fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
    )
      .then(res => res.json())
      .then(data => data)
  }
}

export const upcomingMovies = (page = 1, country = 'US') => {
  if (country !== 'US') {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&include_video=false&language=en-US&page=${page}&with_origin_country=${country}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=2023-01-01&release_date.lte=2024-11-25`
    )
      .then(res => res.json())
      .then(data => data)
  } else {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&page=${page}`
    )
      .then(res => res.json())
      .then(data => data)
  }
}

export const getGenre = () =>
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false`
  )
    .then(res => res.json())
    .then(data => data)

export const getCountries = () =>
  fetch(
    `https://api.themoviedb.org/3/configuration/countries?api_key=${process.env.REACT_APP_API_KEY}`
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
        `https://image.tmdb.org/t/p/w780/${data.backdrop_path}`
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

export const Search = (query, page = 1,type='multi') =>
  fetch(
    `https://api.themoviedb.org/3/search/${type}?query=${query}&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&page=${page}`
  )
    .then(res => res.json())
    .then(data => data)


export const SortByDate = (page, order, country) =>
  fetch(
    `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&include_video=false&language=en-US&page=${page}&with_origin_country=${country}&sort_by=primary_release_date.${order}`
  )
    .then(res => res.json())
    .then(data => data)

export const SortByGenreAndDate = (page, order, genre, country, type) => {
  if (order === 'all') {
    if (type === 'topRated') {
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&page=${page}&with_origin_country=${country}&with_genres=${genre}&sort_by=vote_average.desc`
      )
        .then(res => res.json())
        .then(data => data)
    } else if (type === 'upcoming') {
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&page=${page}&with_origin_country=${country}&with_genres=${genre}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=2023-01-01&release_date.lte=2024-11-25`
      )
        .then(res => res.json())
        .then(data => data)
    } else {
      //popular
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&page=${page}&with_origin_country=${country}&with_genres=${genre}&sort_by=popularity.desc`
      )
        .then(res => res.json())
        .then(data => data)
    }
  } else {
    if (type === 'topRated') {
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&include_video=false&language=en-US&page=${page}&with_origin_country=${country}&sort_by=vote_average.desc&with_genres=${genre}`
      )
        .then(res => res.json())
        .then(data => {
          if (order === 'desc') {
            data.results.sort(
              (a, b) => new Date(b.release_date) - new Date(a.release_date)
            )
            return data
          } else if (order === 'asc') {
            data.results.sort(
              (a, b) => new Date(a.release_date) - new Date(b.release_date)
            )
            return data
          } else {
            return data
          }
        })
    } else if (type === 'upcoming') {
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&language=en-US&page=${page}&with_origin_country=${country}&sort_by=primary_release_date.${order}&with_release_type=2|3&release_date.gte=2023-01-01&release_date.lte=2024-11-25&with_genres=${genre}`
      )
        .then(res => res.json())
        .then(data => data)
    } else {
      //popular
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&vote_average.gte=5&language=en-US&page=${page}&with_origin_country=${country}&sort_by=popularity.desc&with_genres=${genre}`
      )
        .then(res => res.json())
        .then(data => {
          if (order === 'desc') {
            data.results.sort(
              (a, b) => new Date(b.release_date) - new Date(a.release_date)
            )
            return data
          } else if (order === 'asc') {
            data.results.sort(
              (a, b) => new Date(a.release_date) - new Date(b.release_date)
            )
            return data
          } else {
            return data
          }
        })
    }
  }
}

export const badWords = async() =>{
return [
  "4r5e",
  "5h1t",
  "5hit",
  "a55",
  "anal",
  "anus",
  "ar5e",
  "arrse",
  "arse",
  "ass",
  "ass-fucker",
  "asses",
  "assfucker",
  "assfukka",
  "asshole",
  "assholes",
  "asswhole",
  "a_s_s",
  "bitch",
  "boobs",
  "b17ch",
  "b1tch",
  "ballbag",
  "balls",
  "ballsack",
  "bastard",
  "beastial",
  "beastiality",
  "bellend",
  "bestial",
  "bestiality",
  "bi+ch",
  "biatch",
  "bitch",
  "bitcher",
  "bitchers",
  "bitches",
  "bitchin",
  "bitching",
  "bloody",
  "blow job",
  "blowjob",
  "blowjobs",
  "boiolas",
  "bollock",
  "bollok",
  "boner",
  "boob",
  "boobs",
  "booobs",
  "boooobs",
  "booooobs",
  "booooooobs",
  "breasts",
  "buceta",
  "bugger",
  "bum",
  "bunny fucker",
  "butt",
  "butthole",
  "buttmunch",
  "buttplug",
  "c0ck",
  "c0cksucker",
  "carpet muncher",
  "cawk",
  "chink",
  "cipa",
  "cl1t",
  "clit",
  "clitoris",
  "clits",
  "cnut",
  "cock",
  "cock-sucker",
  "cockface",
  "cockhead",
  "cockmunch",
  "cockmuncher",
  "cocks",
  "cocksuck",
  "cocksucked",
  "cocksucker",
  "cocksucking",
  "cocksucks",
  "cocksuka",
  "cocksukka",
  "cok",
  "cokmuncher",
  "coksucka",
  "coon",
  "cox",
  "crap",
  "cum",
  "cummer",
  "cumming",
  "cums",
  "cumshot",
  "cunilingus",
  "cunillingus",
  "cunnilingus",
  "cunt",
  "cuntlick",
  "cuntlicker",
  "cuntlicking",
  "cunts",
  "cyalis",
  "cyberfuc",
  "cyberfuck",
  "cyberfucked",
  "cyberfucker",
  "cyberfuckers",
  "cyberfucking",
  "d1ck",
  "damn",
  "dick",
  "dickhead",
  "dildo",
  "dildos",
  "dink",
  "dinks",
  "dirsa",
  "dlck",
  "dog-fucker",
  "doggin",
  "dogging",
  "donkeyribber",
  "doosh",
  "duche",
  "dyke",
  "ejaculate",
  "ejaculated",
  "ejaculates",
  "ejaculating",
  "ejaculatings",
  "ejaculation",
  "ejakulate",
  "f u c k",
  "f u c k e r",
  "f4nny",
  "fag",
  "fagging",
  "faggitt",
  "faggot",
  "faggs",
  "fagot",
  "fagots",
  "fags",
  "fanny",
  "fannyflaps",
  "fannyfucker",
  "fanyy",
  "fark",
  "f4rk",
  "fatass",
  "fcuk",
  "fcuker",
  "fcuking",
  "feck",
  "fecker",
  "felching",
  "fellate",
  "fellatio",
  "fingerfuck",
  "fingerfucked",
  "fingerfucker",
  "fingerfuckers",
  "fingerfucking",
  "fingerfucks",
  "fistfuck",
  "fistfucked",
  "fistfucker",
  "fistfuckers",
  "fistfucking",
  "fistfuckings",
  "fistfucks",
  "flange",
  "fook",
  "fooker",
  "fuck",
  "fucka",
  "fucked",
  "fucker",
  "fuckers",
  "fuckhead",
  "fuckheads",
  "fuckin",
  "fucking",
  "fuckings",
  "fuckingshitmotherfucker",
  "fuckme",
  "fucks",
  "fuckwhit",
  "fuckwit",
  "fudge packer",
  "fudgepacker",
  "fuk",
  "fuker",
  "fukker",
  "fukkin",
  "fuks",
  "fukwhit",
  "fukwit",
  "fux",
  "fux0r",
  "f_u_c_k",
  "gangbang",
  "gangbanged",
  "gangbangs",
  "gaylord",
  "gaysex",
  "goatse",
  "God",
  "god-dam",
  "god-damned",
  "goddamn",
  "goddamned",
  "hardcoresex",
  "hell",
  "heshe",
  "hoar",
  "hoare",
  "hoer",
  "homo",
  "hore",
  "horniest",
  "horny",
  "hotsex",
  "jack-off",
  "jackoff",
  "jap",
  "jerk-off",
  "jism",
  "jiz",
  "jizm",
  "jizz",
  "kawk",
  "knob",
  "knobead",
  "knobed",
  "knobend",
  "knobhead",
  "knobjocky",
  "knobjokey",
  "kock",
  "kondum",
  "kondums",
  "kum",
  "kummer",
  "kumming",
  "kums",
  "kunilingus",
  "l3i+ch",
  "l3itch",
  "labia",
  "lmfao",
  "lust",
  "lusting",
  "m0f0",
  "m0fo",
  "m45terbate",
  "ma5terb8",
  "ma5terbate",
  "masochist",
  "master-bate",
  "masterb8",
  "masterbat*",
  "masterbat3",
  "masterbate",
  "masterbation",
  "masterbations",
  "masturbate",
  "mo-fo",
  "mof0",
  "mofo",
  "mothafuck",
  "mothafucka",
  "mothafuckas",
  "mothafuckaz",
  "mothafucked",
  "mothafucker",
  "mothafuckers",
  "mothafuckin",
  "mothafucking",
  "mothafuckings",
  "mothafucks",
  "mother fucker",
  "motherfuck",
  "motherfucked",
  "motherfucker",
  "motherfuckers",
  "motherfuckin",
  "motherfucking",
  "motherfuckings",
  "motherfuckka",
  "motherfucks",
  "muff",
  "mutha",
  "muthafecker",
  "muthafuckker",
  "muther",
  "mutherfucker",
  "n1gga",
  "n1gger",
  "nazi",
  "nigg3r",
  "nigg4h",
  "nigga",
  "niggah",
  "niggas",
  "niggaz",
  "nigger",
  "niggers",
  "nob",
  "nob jokey",
  "nobhead",
  "nobjocky",
  "nude",
  "naked",
  "nobjokey",
  "numbnuts",
  "nutsack",
  "orgasim",
  "orgasims",
  "orgasm",
  "orgasms",
  "p0rn",
  "porn",
  "pawn",
  "pecker",
  "penis",
  "penisfucker",
  "phonesex",
  "phuck",
  "phuk",
  "phuked",
  "phuking",
  "phukked",
  "phukking",
  "phuks",
  "phuq",
  "pigfucker",
  "pimpis",
  "piss",
  "pissed",
  "pisser",
  "pissers",
  "pisses",
  "pissflaps",
  "pissin",
  "pissing",
  "pissoff",
  "poop",
  "porn",
  "porno",
  "pornography",
  "pornos",
  "prick",
  "pricks",
  "pron",
  "porn",
  "pube",
  "pusse",
  "pussi",
  "pussies",
  "pussy",
  "pussys",
  "rectum",
  "retard",
  "rimjaw",
  "rimming",
  "s hit",
  "s.o.b.",
  "sadist",
  "schlong",
  "screwing",
  "scroat",
  "scrote",
  "scrotum",
  "semen",
  "sex",
  "sh!+",
  "sh!t",
  "sh1t",
  "shag",
  "shagger",
  "shaggin",
  "shagging",
  "shemale",
  "shi+",
  "shit",
  "shitdick",
  "shite",
  "shited",
  "shitey",
  "shitfuck",
  "shitfull",
  "shithead",
  "shiting",
  "shitings",
  "shits",
  "shitted",
  "shitter",
  "shitters",
  "shitting",
  "shittings",
  "shitty ",
  "skank",
  "slut",
  "sluts",
  "smegma",
  "smut",
  "snatch",
  "son-of-a-bitch",
  "spac",
  "spunk",
  "s_h_i_t",
  "t1tt1e5",
  "t1tties",
  "teets",
  "teez",
  "testical",
  "testicle",
  "tit",
  "titfuck",
  "tits",
  "titt",
  "tittie5",
  "tittiefucker",
  "titties",
  "tittyfuck",
  "tittywank",
  "titwank",
  "tosser",
  "turd",
  "tw4t",
  "twat",
  "twathead",
  "twatty",
  "twunt",
  "twunter",
  "v14gra",
  "v1gra",
  "vagina",
  "viagra",
  "vulva",
  "w00se",
  "wang",
  "wank",
  "wanker",
  "wanky",
  "whoar",
  "whore",
  "willies",
  "willy",
  "xrated",
  "x-rated",
  "xxx",
  "ero",
  "erot",
  "eroti",
  "erotic",
  "sexy",
  "breast",
  "shut",
  "temptation",
  "Temptation"
];
}
