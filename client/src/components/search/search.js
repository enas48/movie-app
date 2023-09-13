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
  const [badWords, setBackwords] = useState([]);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setSearchField(e.target.value);

    if (
      e.target.value.length >= 3 &&
      !badWords.includes(e.target.value.trim())
    ) {
      MovieApi.Search(e.target.value).then((data) => {
        let filtered = data.results.filter((i) => {
          const helloExist = badWords.some((item) =>
            (i?.name || i?.title).toLowerCase().includes(item)
          );

          if (!helloExist) {
            return i;
          }
        });

        setSearchList(filtered);
      });
    } else {
      setSearchList([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchField !== "" && searchField.length >= 3) {
      setSearchField("");
      setSearchList([]);
      navigate(`/searchlist/all/${searchField}`, { replace: true });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchField !== "" && searchField.length >= 3) {
      setSearchField("");
      setSearchList([]);
      navigate(`/searchlist/all/${searchField}`, { replace: true });
    }
  };
  useEffect(() => {
    MovieApi.badWords().then((data) => setBackwords(data));
  }, []);
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
      {searchList.length !== 0 && searchField.length >= 3 && (
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
                  <div className="cursor-pointer d-flex align-items-start gap-1 search-item">
                    {item.media_type === "movie" && (
                      <BiCameraMovie className="search-icon flex-shrink-0" />
                    )}
                    {item.media_type === "tv" && (
                      <PiTelevisionBold className="search-icon flex-shrink-0" />
                    )}
                    {item.media_type === "person" && (
                      <MdPerson className="search-icon flex-shrink-0" />
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
      {searchField !== "" && searchField.length < 3 && (
        <div className="search-results  p-3">
          <span >
            Please enter at least 3 characters to search...
          </span>
        </div>
      )}
      {searchList.length === 0 &&
        searchField !== "" &&
        searchField.length >= 3 && (
          <div className="search-results p-3">
            <span >No Results found</span>
          </div>
        )}
    </div>
  );
}

export default Search;
