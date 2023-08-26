import React, { useState, useEffect } from "react";

import SidebarLayout from "../../../components/sidebarLayout";
import Search from "../../../components/search";

import Loading from "../../../uiElements/preloading";
import RegisterModal from "../../../uiElements/RegisterModal";
import { Outlet, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

function AllSeries(props) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 800));
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <RegisterModal show={props.show} handleCloseModal={props.handleClose} />

        <Search />
        <div className="p-3 mt-lg-5">
          <Nav className="tv-list ">
            <LinkContainer
              to="onair"
           
            >
              <Nav.Link
                className={
                  location.pathname.includes("onair") ||
                  (location.pathname.includes("allseries") &&
                    !location.pathname.includes("topRated") &&
                    !location.pathname.includes("popular"))
                    ? "active"
                    : ""
                }
              >
                onAir
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="topRated">
              <Nav.Link
                className={
                  location.pathname.includes("topRated") ? "active" : ""
                }
              >
                Top Rated
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="popular">
              <Nav.Link
                className={
                  location.pathname.includes("popular") ? "active" : ""
                }
              >
                popular
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Outlet />
        </div>
      </SidebarLayout>
    </>
  );
}

export default AllSeries;
