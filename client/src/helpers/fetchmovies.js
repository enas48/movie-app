export const list = async movies => {
  console.log(movies)
  let imageArr = []
  for (let data of movies) {
    if (  data?.poster_path && data.poster_path !== null) {
      const response = await fetch(
        `https://image.tmdb.org/t/p/original/${data.poster_path}`
      )
      const image = await response
      if (image?.url) {
        imageArr.push({
          id: data.id,
          title: data.title,
          year: new Date(data.release_date).getFullYear(),
          rate: data.vote_average.toFixed(1),
          image: image.url
        })
      }
    } else {
      if(data.id){
      imageArr.push({
        id: data.id,
        title: data.title,
        year: new Date(data.release_date).getFullYear(),
        rate: data.vote_average.toFixed(1),
        image: ''
      })
    }
    }
  }
  return imageArr
}
