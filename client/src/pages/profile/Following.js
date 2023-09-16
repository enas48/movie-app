import React, { useEffect, useState,useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./follow.css";
import FollowButton from './FollowButton'
import AuthContext from '../../helpers/authContext'

function Following({
  setFollowers,
  followed,
  setFollowed,
  following,
}) {
  const { userId } = useContext(AuthContext)
  const { id } = useParams();
  const imagePerRow = 8;
  const [next, setNext] = useState(imagePerRow);
  const [followingDetails, setfollowingDetails] = useState([]);
  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

  const getDetails = async (following) => {
    try {
        following.map(async (id) => {
        const details = await axios(
          `${process.env.REACT_APP_APP_URL}/profile/users/${id}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        console.log(details.data.profile);
        setfollowingDetails([...followingDetails, details.data.profile]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(followingDetails);

  useEffect(() => {
    if (following.length !== 0) {
      getDetails(following);
    }

  }, [following]);

  return (
    <>
      <div className="details-related-content">
        {followingDetails.length !== 0 && (
          <>
                     <div className='row m-0 gap-4 d-flex justify-content-center '>
              {followingDetails?.slice(0, next)?.map(item => {
                console.log(item.user._id)
                console.log(userId)
                return (
                  <div className=' col-12'>
                    <div className='d-flex flex-row align-items-center justify-content-center justify-content-sm-start follow card card-container'>
                      <LinkContainer
                        to={`/profile/${item.user._id}`}
                        key={item.user._id}
                      >
                        <div className='d-flex align-items-center me-2'>
                          <div className='img-container'>
                            {item.profileImage !== '' && (
                              <LazyLoadImage
                                src={item.profileImage}
                                alt={item.user?.username}
                              />
                            )}
                            {item.profileImage === '' && (
                              <LazyLoadImage
                                className='no-img'
                                src={
                                  process.env.PUBLIC_URL + '../../person.png'
                                }
                                alt=''
                              />
                            )}
                          </div>
                          <div className='card-body p-1 text-start'>
                            <span className='text-secondry text-nowrap'>
                              {' '}
                              {item.user?.username}
                            </span>
                          </div>
                        </div>
                      </LinkContainer>
                      {userId !== id || userId ===item.user._id&& (
                        <FollowButton
                          setFollowers={setFollowers}
                          followed={followed}
                          setFollowed={setFollowed}
                          followUserId={item.user._id}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            {next < followingDetails?.length && (
              <button
                className="m-auto btn custom-btn mt-3"
                onClick={handleMoreImage}
              >
                Load more
              </button>
            )}
          </>
        )}
        {following.length===0 && <p>No users yet</p>}
      </div>
    </>
  );
}

export default Following;
