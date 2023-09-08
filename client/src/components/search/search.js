import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import * as MovieApi from "../../api/MovieApi";
import { FiSearch } from "react-icons/fi";
import { LinkContainer } from "react-router-bootstrap";
import { MdPerson } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { BiCameraMovie } from "react-icons/bi";
import "./search.css";
function Search() {
  const [searchField, setSearchField] = useState("");
  const [searchList, setSearchList] = useState([]);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setSearchField(e.target.value);
    MovieApi.Search(e.target.value).then((data) => {
      setSearchList(data.results);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchField !== "") {
      setSearchField("");
      setSearchList([]);
      navigate(`/search/${searchField}`, { replace: true });
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchField !== "") {
      setSearchField("");
      setSearchList([]);
      navigate(`/search/${searchField}`, { replace: true });
    }
  };

  return (
    <div className="search-container">
      <Form className="d-flex" onSubmit={(e) => handleSearch(e)}>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">
            <Button variant="outline-light" type="submit">
              <FiSearch />
            </Button>
          </InputGroup.Text>
          <Form.Control
            placeholder={"Search"}
            aria-label="Username"
            value={searchField}
            aria-describedby="basic-addon1"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
      </Form>
      {searchList.length !== 0 && (
        <div className="search-results">
          {searchList.map((item, i) => {
            return (
              item?.media_type && (
                <LinkContainer
                  key={i}
                  to={`/search/${item?.media_type}/${item.id}`}
                  onClick={() => {
                    setSearchField("");
                    setSearchList([]);
                  }}
                  state={{ data: item }}
                >
                  <div className="cursor-pointer d-flex align-items-center gap-1 search-item">
                    {item.media_type === "movie" && (
                      <BiCameraMovie className="search-icon" />
                    )}
                    {item.media_type === "tv" && (
                      <PiTelevisionBold className="search-icon" />
                    )}
                    {item.media_type === "person" && (
                      <MdPerson className="search-icon" />
                    )}
                    <span>{item?.title}</span>
                    <span>{item?.name}</span>
                  </div>
                </LinkContainer>
              )
            );
          })}
        </div>
      )}
      {searchList.length === 0 && searchField !== "" && (
        <div className="search-results">
          <span className="p-3">No Results found</span>
        </div>
      )}
    </div>
  );
}

export default Search;
