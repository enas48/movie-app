
export const list = async(series) =>{ 
    console.log(series)
      let imageArr =[];
        for (let data of series) {
          if (data?.backdrop_path && data.backdrop_path !== null) {
            const response = await fetch(
              `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
            );
            const image = await response;
            if (image?.url) {
              imageArr.push({
                id: data.id,
                name: data.name,
                year: new Date(data.first_air_date).getFullYear(),
                rate: data.vote_average.toFixed(1),
                image: image.url,
              });
            }
          //   else{
             
          //       imageArr.push({
          //         id: data.id,
          //         name: data.name,
          //         year: new Date(data.release_date).getFullYear(),
          //         rate: data.vote_average.toFixed(1),
          //         image: ''
          //       })
              
          //   }
          // }else{
          //   if(data.id){
          //     imageArr.push({
          //       id: data.id,
          //       name: data.name,
          //       year: new Date(data.release_date).getFullYear(),
          //       rate: data.vote_average.toFixed(1),
          //       image: ''
          //     })
          //   }
          // }
        //}
          }}
        return imageArr
      }
  
  