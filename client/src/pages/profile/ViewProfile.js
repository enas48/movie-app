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

function ViewProfile({ handleUpdate, edit, setEdit }) {
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);
  const { id } = useParams();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const location = useLocation();
  const [username, setUsername] = useState("");
  // const [edit, setEdit] = useState(false);

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
        setProfileImage(result.data.profile.profileImage);
        setCoverImage(result.data.profile.coverImage);
        setUsername(result.data.profile.user.username);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const bgImageStyle =
    coverImage !== ""
      ? {
          width: "100%",
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {};

  useEffect(() => {
    if (id) {
      fetchUserProfile();
    }
  }, [id, edit]);
  console.log(edit);
  return (
    <>
      <SidebarLayout setEdit={setEdit}>
        <Search />
        {edit && userId === id ? (
          <EditProfile handleUpdate={handleUpdate} setEdit={setEdit} />
        ) : (
          <>
            <div className="header-bg">
              <div className="edit-cover">
                <div className="profile-container ">
                  <div className="profile-image">
                    <div className="overlay"></div>
                    {coverImage !== "" && <img src={coverImage} alt="" />}
                  </div>
                </div>
              </div>
              <div className=" profile-header container">
                <div className=" d-flex align-items-end gap-2 profile-info">
                  <div className="profile-container ">
                    {/* <div className='overlay'></div> */}
                    <div className="profile-image">
                      <LazyLoadImage
                        src={
                          profileImage === ""
                            ? process.env.PUBLIC_URL + "../../person.png"
                            : profileImage
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-capitalize">{username}</p>
                    <div className="d-flex gap-2 text-white-50">
                      <div className="d-flex flex-column align-items-center ">
                        <p className="">
                          {" "}
                          <span className="fw-bold">0</span> Following
                        </p>{" "}
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <p className="">
                          {" "}
                          <span className="fw-bold">0</span> Followers
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 d-flex ms-auto btn-container">
                  {id === userId ? (
                    // <LinkContainer to={`edit`}>
                    <Button
                      className="custom-btn "
                      onClick={() => setEdit(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Button className="custom-btn ">Follow</Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <div className="content-wrap">
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
                className={
                  location.pathname.includes("watched") ? "active " : ""
                }
              >
                Watched
              </Nav.Link>
            </LinkContainer>
          </Nav>

          <Outlet />
        </div>
      </SidebarLayout>
    </>
  );
}

export default ViewProfile;
