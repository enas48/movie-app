export const getPerson = person_id =>
  fetch(
    `https://api.themoviedb.org/3/person/${person_id}?api_key=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => res.json())
    .then(data => data)

export const getPersonDetails = async data => {
  let person = {}
  if (data?.profile_path && data.profile_path !== null) {
    const response = await fetch(
      `https://image.tmdb.org/t/p/original${data.profile_path}`
    )
    const image = await response
    if (image?.url) {
         person.id= data.id;
         person.title= data?.name && data.name;
         person.biography= data?.biography && data.biography;
         person.birthday= data?.birthday && data.birthday;
         person.known_for_department= data?.known_for_department && data.known_for_department;
         person.also_known_as= data?.also_known_as && data.also_known_as;
         person.place_of_birth= data?.place_of_birth && data.place_of_birth;
         person.image= image.url
      }
     else {
      if (data.id) {
        person.id= data.id;
        person.title= data?.name && data.name;
        person.biography= data?.biography && data.biography;
        person.birthday= data?.birthday && data.birthday;
        person.known_for_department= data?.known_for_department && data.known_for_department;
        person.also_known_as= data?.also_known_as && data.also_known_as;
        person.place_of_birth= data?.place_of_birth && data.place_of_birth;
         person.image= ''
      }
    }
  } else {
    if (data.id) {
      person.id= data.id;
      person.title= data?.name && data.name;
      person.biography= data?.biography && data.biography;
      person.birthday= data?.birthday && data.birthday;
      person.known_for_department= data?.known_for_department && data.known_for_department;
      person.also_known_as= data?.also_known_as && data.also_known_as;
      person.place_of_birth= data?.place_of_birth && data.place_of_birth;
      person.image= ''
    }
  }
  return person
}

export const Movies = person_id =>
  fetch(
    `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => res.json())
    .then(data => data)

    export const Series = person_id =>
  fetch(
    `https://api.themoviedb.org/3/person/${person_id}/tv_credits?api_key=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => res.json())
    .then(data => data)