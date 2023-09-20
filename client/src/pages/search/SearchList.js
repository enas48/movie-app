import React, { useState } from "react";
import "./searchlist.css";
import SidebarLayout from "../../components/sidebar/sidebarLayout";
import Search from "../../components/search/search";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet, useParams, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function SearchList() {
  let { query } = useParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SidebarLayout>
        {/* <Search /> */}
        <div className="search-page p-3 container">
          <Nav className="tv-list flex-nowrap flex-shrink-0 mb-3">
            <LinkContainer to={`/searchlist/all/${query}`}>
              <Nav.Link
                className={location.pathname.includes("all") ? "active" : ""}
                onClick={() => {
                  setCurrentPage(1);
                }}
              >
                All
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to={`/searchlist/movie/${query}`}>
              <Nav.Link
                className={location.pathname.includes("movie") ? "active" : ""}
                onClick={() => {
                  setCurrentPage(1);
                }}
              >
                Movies
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to={`/searchlist/tv/${query}`}>
              <Nav.Link
                className={location.pathname.includes("tv") ? "active" : ""}
                onClick={() => {
                  setCurrentPage(1);
                }}
              >
                Tv series
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to={`/searchlist/person/${query}`}>
              <Nav.Link
                className={location.pathname.includes("person") ? "active" : ""}
                onClick={() => {
                  setCurrentPage(1);
                }}
              >
                person
              </Nav.Link>
            </LinkContainer>
          </Nav>

          <Outlet context={[handleChange, currentPage]} />
        </div>
      </SidebarLayout>
    </>
  );
}

export default SearchList;
