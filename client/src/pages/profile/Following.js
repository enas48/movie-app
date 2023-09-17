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
  setFollowing
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
    let arr =[]
    for (let data of following) {
      const response = await  axios(
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
    console.log(arr)
    setfollowingDetails(arr);
    // try {
    //     following.map(async (uid) => {
    //     const details = await axios(
    //       `${process.env.REACT_APP_APP_URL}/profile/users/${uid}`,
    //       {
    //         headers: {
    //           Accept: "application/json",
    //         },
    //       }
    //     );
    //     const d = await details;
    //   arr.push( d);
    //     setfollowingDetails([...followingDetails, details.data.profile]);
    //   });
    //   console.log(arr)
    // } catch (err) {
    //   console.log(err);
    // }
  };



  useEffect(() => {
    if (following.length !== 0) {
      getDetails(following);
    }

  }, [following]);
console.log(followingDetails)
  return (
    <>
      <div className="details-related-content">
        {followingDetails.length !== 0 && (
          <>
                     <div className='row m-0 gap-4 d-flex justify-content-center '>
              {followingDetails?.slice(0, next)?.map(item => {
                console.log(item.user)
                console.log(userId)
                return (
                  <div className=' col-12'         key={item.user._id}>
                    <div className='d-flex flex-row align-items-center justify-content-center justify-content-sm-start follow card card-container'>
                      <LinkContainer
                        to={`/profile/${item.user._id}`}
                
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
                      {userId !== item.user._id &&(
                        <FollowButton
                          setFollowers={setFollowers}
                          followed={followed}
                          setFollowed={setFollowed}
                          followUserId={item.user._id}
                          setFollowing={setFollowing}
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
