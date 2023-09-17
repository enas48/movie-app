import React, { useEffect, useState, useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import "./follow.css";
import FollowButton from "./FollowButton";
import AuthContext from "../../helpers/authContext";

function Followers({ setFollowers, followers, setFollowing }) {
  const { userId } = useContext(AuthContext);
  const imagePerRow = 8;
  const [next, setNext] = useState(imagePerRow);
  const [followersDetails, setfollowersDetails] = useState([]);

  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

  const getDetails = async (followers) => {
    try {
      let arr = [];
      for (let data of followers) {
        const response = await axios(
          `${process.env.REACT_APP_APP_URL}/profile/users/${data}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        ).then((details) => {
          return details.data.profile;
        });
        const details = await response;
        arr.push(details);
      }

      setfollowersDetails(arr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails(followers);
  }, [followers]);

  return (
    <>
      <div className="details-related-content">
        {followersDetails.length !== 0 && (
          <>
            <div className="row m-0 gap-4 d-flex justify-content-center ">
              {followersDetails?.slice(0, next)?.map((item) => {
                return (
                  <div className=" col-12" key={item.user._id}>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-sm-start follow card card-container">
                      <LinkContainer to={`/profile/${item.user._id}`}>
                        <div className="d-flex align-items-center me-2">
                          <div className="img-container">
                            {item.profileImage !== "" && (
                              <LazyLoadImage
                                src={item.profileImage}
                                alt={item.user?.username}
                              />
                            )}
                            {item.profileImage === "" && (
                              <LazyLoadImage
                                className="no-img"
                                src={
                                  process.env.PUBLIC_URL + "../../person.png"
                                }
                                alt=""
                              />
                            )}
                          </div>
                          <div className="card-body p-1 text-start">
                            <span className="text-secondry text-nowrap">
                              {" "}
                              {item.user?.username}
                            </span>
                          </div>
                        </div>
                      </LinkContainer>
                      {userId !== item.user._id && (
                        <FollowButton
                          setFollowers={setFollowers}
                          followUserId={item.user._id}
                          setFollowing={setFollowing}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {next < followersDetails?.length && (
              <button
                className="m-auto btn custom-btn mt-3"
                onClick={handleMoreImage}
              >
                Load more
              </button>
            )}
          </>
        )}
        {followers.length === 0 && <p>No users yet</p>}
      </div>
    </>
  );
}

export default Followers;
