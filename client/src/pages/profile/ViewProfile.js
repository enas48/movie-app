import React, { useContext, useState, useEffect } from "react";
import { useParams, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

import Loading from "../../components/uiElements/preloading";
import AuthContext from "../../helpers/authContext";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Nav } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SidebarLayout from "../../components/sidebar/sidebarLayout";
import Search from "../../components/search/search";
import "./profile.css";
import EditProfile from "./EditProfile";

function ViewProfile({ handleUpdate }) {
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);
  const { id } = useParams();
  const [image, setImage] = useState("");
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [edit, setEdit] = useState(true);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (result.data.profile) {
        setImage(result.data.profile.image);
        setUsername(result.data.profile.user.username);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {

    if (id) {
      fetchUserProfile();
    }
    console.log(edit);
  }, [id, edit]);

  return (
    <>
      <SidebarLayout>
        <Search />
        {edit && userId===id? (
          <EditProfile setEdit={setEdit} handleUpdate={handleUpdate} />
        ) : (
          <div className="header-bg">
            <div className=" profile-header container">
              <div className=" d-flex align-items-center gap-2 profile-info">
                <div className="profile-container mb-2 mb-sm-3">
                  {/* <div className='overlay'></div> */}
                  <div className="profile-image">
                    <LazyLoadImage
                      src={
                        image === ""
                          ? process.env.PUBLIC_URL + "./person.png"
                          : image
                      }
                      alt=""
                    />
                  </div>
                </div>
                <p className="mb-3">{username}</p>
              </div>

              <div className="mb-3 d-flex ms-auto btn-container">
                {id === userId ? (
                  // <LinkContainer to={`edit`}>
                  <Button className="custom-btn " onClick={() => setEdit(true)}>
                    {" "}
                    Edit Profile
                  </Button>
                ) : (
                  <Button className="custom-btn ">Follow</Button>
                )}
              </div>
            </div>
          </div>
        )}

        <Nav className="tv-list profile flex-nowrap flex-shrink-0  p-3 ">
          <LinkContainer to={`/profile/${id}`}>
            <Nav.Link
              className={location.pathname.includes("all") ? "active " : ""}
            >
              All
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to={`/profile/${id}/bookmark`}>
            <Nav.Link
              className={
                location.pathname.includes("bookmark") ? "active " : ""
              }
            >
              wishlist
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to={`/profile/${id}/favourite`}>
            <Nav.Link
              className={
                location.pathname.includes("favourite") ? "active " : ""
              }
            >
              Favourite
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to={`/profile/${id}/watched`}>
            <Nav.Link
              className={location.pathname.includes("watched") ? "active " : ""}
            >
              Watched
            </Nav.Link>
          </LinkContainer>
        </Nav>

        <Outlet />
      </SidebarLayout>
    </>
  );
}

export default ViewProfile;
