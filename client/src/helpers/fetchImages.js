
export const list = async(movies) =>{ 
    let imageArr =[];
      for (let data of movies) {
        if (data?.backdrop_path && data.backdrop_path !== null) {
          const response = await fetch(
            `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
          );
          const image = await response;
          if (image?.url) {
            imageArr.push({
              id: data.id,
              title: data.title,
              year: new Date(data.release_date).getFullYear(),
              type: data.media_type,
              rate: data.vote_average.toFixed(1),
              image: image.url,
            });
          }
        }
      }
      return imageArr
    }

