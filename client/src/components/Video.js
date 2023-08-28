import React, { useEffect, useState } from "react";
import * as TvSeriesApi from "../api/TvSeriesApi";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

function Video({ keyVideo, playVideo }) {
  const [video, setVideos] = useState([]);
  const { id } = useParams();

  const fetchTrailer = async (id) => {
    try {
      TvSeriesApi.Trailer(id).then((data) => {
        console.log(data.results);
        let youtubeVideos = data.results.filter((d) => d.site === "YouTube");
        console.log(youtubeVideos);
        setVideos(youtubeVideos);
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchTrailer(id)
    console.log(keyVideo)
  }, [keyVideo]);
  return (
    <>
    {video.length!==0 && (
        <div className="details-related-content">
         
          <h3 className="mb-4">Trailer</h3>
          <div className="row">
            <div className="col-lg-8 text-center my-2">
            <ReactPlayer className='w-100' url={`https://www.youtube.com/watch?v=${keyVideo}?showinfo=0&enablejsapi=1&origin=http://localhost:3000'`} />
              {/* <iframe
                src={`https://www.youtube.com/embed/${key}`}
                height="480"
                width="100%"
                className="iframe"
                title="Iframe Example"
              ></iframe> */}
            </div>
            {video.length !== 0 && (
              <div className="col-lg-4 my-2">
                <div className="video-container d-flex flex-column gap-3" >
                  {video.map((item) => (
                    <div className="card card-container" key={item.id} onClick={()=>playVideo(item.id)}>
                      <div className="card-body row">
                        <div className="col-8">{item?.name}</div>
                        <div className="col-4 ">
                          <img
                            src={`https://i.ytimg.com/vi/${item.key}/maxresdefault.jpg`}
                            className="img-fluid rounded"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </>
  )
  
}
export default Video;
