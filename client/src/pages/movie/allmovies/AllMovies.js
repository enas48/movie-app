import React, { useState, useEffect } from "react";
import * as MovieApi from "../../../api/MovieApi";

import SidebarLayout from "../../../components/sidebarLayout";
import Search from "../../../components/search";
import Loading from "../../../uiElements/preloading";
import RegisterModal from "../../../uiElements/RegisterModal";
import { Outlet, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { BiFilterAlt, BiPlus } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { Dropdown as PrimDropdown } from "primereact/dropdown";

function AllMovies(props) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [date, setDate] = useState("all");
  const [genre, setGenre] = useState([]);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filteredGenre, setFilteredGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="d-flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="d-flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };

  const selectedOrderTemplate = (option, props) => {
    if (option) {
      return (
        <div className="d-flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const orderOptionTemplate = (option) => {
    return (
      <div className="d-flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };
  const handleChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenre = (e, id) => {
    if (filteredGenre.includes(id)) {
      let filtered = filteredGenre.filter((item) => {
        return item !== id;
      });
      setFilteredGenre(filtered);
    } else {
      setFilteredGenre([...filteredGenre, id]);
    }

    setCurrentPage(1);
  };

  //intilize get data from api
  const loadGenreAndCountries = async () => {
    MovieApi.getGenre().then((data) => {
      setGenre(data.genres);
    });
    MovieApi.getCountries().then((data) => {
      let countries = data.map((item) => {
        return { name: item.english_name, code: item.iso_3166_1 };
      });
      setCountries(countries);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 800));
      setIsLoading(false);
    };
    loadGenreAndCountries();
    loadData();
  }, [date, filteredGenre]);

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <RegisterModal show={props.show} handleCloseModal={props.handleClose} />

        <Search />
        <div className="p-3 mt-lg-5">
          <div className="d-flex justify-content-between flex-wrap gap-1">
            <Nav className="tv-list flex-nowrap flex-shrink-0">
              <LinkContainer to="trending">
                <Nav.Link
                  className={
                    location.pathname.includes("trending") ||
                    (location.pathname.includes("allmovies") &&
                      !location.pathname.includes("topRated") &&
                      !location.pathname.includes("upcoming"))
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setCurrentPage(1);
                    setDate("all");
                  }}
                >
                  Trending
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="topRated">
                <Nav.Link
                  className={
                    location.pathname.includes("topRated") ? "active" : ""
                  }
                  onClick={() => {
                    setCurrentPage(1);
                    setDate("all");
                  }}
                >
                  Top Rated
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="upcoming">
                <Nav.Link
                  className={
                    location.pathname.includes("upcoming") ? "active" : ""
                  }
                  onClick={() => {
                    setCurrentPage(1);
                    setDate("all");
                  }}
                >
                  Upcoming
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <div className="filter-container d-flex gap-2 align-items-center">
              <BiFilterAlt className="icon" />

              <PrimDropdown
                value={selectedOrder}
                onChange={(e) => {
                  console.log(e.value);
                  setSelectedOrder(e.value);
                  setDate(e.value.name.toLowerCase());
                  setCurrentPage(1);
                }}
                options={[
                  { name: "All" },
                  { name: "Latest" },
                  { name: "Oldest" },
                ]}
                optionLabel="Order"
                placeholder="Order"
                valueTemplate={selectedOrderTemplate}
                itemTemplate={orderOptionTemplate}
                className="w-full md:w-14rem"
              />
              <PrimDropdown
                value={selectedCountry}
                onChange={(e) => {
                  console.log(e.value);
                  setSelectedCountry(e.value);
                  setCountry(e.value.code);
                  setCurrentPage(1);
                }}
                options={countries}
                optionLabel="name"
                placeholder="Select a Country"
                filter
                valueTemplate={selectedCountryTemplate}
                itemTemplate={countryOptionTemplate}
                className="w-full md:w-14rem"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
            {genre.length !== 0 &&
              genre.map((item, i) => {
                return (
                  <div key={item.id}>
                    {filteredGenre.includes(item.id)}
                    <button
                      className={
                        filteredGenre.includes(item.id)
                          ? "m-auto btn active text-nowrap filter-btn"
                          : " btn m-auto text-nowrap filter-btn"
                      }
                      onClick={(e) => handleGenre(e, item.id)}
                    >
                      {filteredGenre.includes(item.id)}
                      {item.name}&nbsp;
                      {filteredGenre.includes(item.id) ? (
                        <MdDone className="icon" />
                      ) : (
                        <BiPlus className="icon" />
                      )}
                    </button>
                  </div>
                );
              })}
          </div>

          <Outlet context={[date, country,handleChange, currentPage, filteredGenre]} />
        </div>
      </SidebarLayout>
    </>
  );
}

export default AllMovies;
