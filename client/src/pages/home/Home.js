import React, { useEffect, useState, useMemo, useContext } from "react";
import "./home.css";

import { Link as LinkRouter } from "react-router-dom";
import * as MovieApi from "../../api/MovieApi";
import MovieList from "../../components/MovieList";
import TvList from "../../components/TVList";
import Header from "../../components/header/Header";
import Loading from "../../components/uiElements/preloading";
import { PiTelevision } from "react-icons/pi";
import RegisterModal from "../../components/uiElements/RegisterModal";
import AuthContext from "../../helpers/authContext";
import Slider from "react-slick";

function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const { userId } = useContext(AuthContext);

  let imageArr = useMemo(() => [], []);
  let posterArr = useMemo(() => [], []);

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    pauseOnHover: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  let preloadImages = async (results) => {
    setIsLoading(true);

    for (let data of results) {
      let poster = "";
      MovieApi.getImage(data.id).then((movie) => {
        if (movie?.backdrops[0] && movie?.backdrops[0] !== null) {
          poster = `http://image.tmdb.org/t/p/original${movie.backdrops[0].file_path}`;
          imageArr.push({
            id: data.id,
            image: poster,
            caption: data.original_title,
          });
        }
      });
    }
    setImages(imageArr);
    await new Promise((r) => setTimeout(r, 2000));
    setIsLoading(false);
  };

  useEffect(() => {
    MovieApi.popularMovies().then((movie) => {
      preloadImages(movie.results);
    });
  }, [imageArr]);

  return (
    <>
      {isLoading && <Loading />}
      <RegisterModal show={props.show} handleCloseModal={props.handleClose} />

      <div className="home">
        <Header />
        <div className="p-0 mb-5">
          {images.length !== 0 && (
            <>
              <Slider {...settings} className="carsoul">
                {images.slice(0, 10).map((item) => (
                  <div key={item.id} className="carsoul-item">
                    <h3>{item?.caption}</h3>
                    <img src={item?.image} alt={item.caption} />
                    <div className="overlay"></div>
                  </div>
                ))}
              </Slider>
            </>
          )}
        </div>
        <div className="container py-5">
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind="trending"
            cols={4}
          />
          <br />
          <MovieList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind="topRated"
            cols={4}
          />
        </div>
        {!userId && (
          <div className="create-account">
            <div className="row align-items-center">
              <div className="col-md-6 text-center">
                <PiTelevision className="display-1" />
              </div>
              <div className="col-md-6 text-center">
                <h2 className="mb-4 h-3">
                  See New and recently added <br /> movies and TV shows
                </h2>
                <LinkRouter to="/register" className="custom-btn py-2 h5">
                  <span> Create Account</span>
                </LinkRouter>
              </div>
            </div>
          </div>
        )}
        <div className="container py-5">
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind="topRated"
            cols={4}
          />
          <TvList
            bookmarkedIds={props.bookmarkedIds}
            addBookMark={props.addBookMark}
            favouriteIds={props.favouriteIds}
            addFavourite={props.addFavourite}
            kind="onair"
            cols={4}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
