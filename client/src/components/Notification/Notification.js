import "./notification.css";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../helpers/authContext";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsFillPersonFill, BsFillHeartFill } from "react-icons/bs";
import moment from "moment";

function Notification({ notification }) {
  const [image, setImage] = useState(process.env.PUBLIC_URL + "/person.png");
  const [username, setUsername] = useState("");

  const fetchUser = async (id) => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (result.data.profile.profileImage !== "") {
        setImage(result.data.profile.profileImage);
      }
      setUsername(result.data.profile.user.username);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (notification?.senderUser) {
      fetchUser(notification.senderUser);
    }
  }, [notification]);

  return (
    <Dropdown.Item className={` ${notification.read ? "" : "active"}`}>
      <div className="d-flex gap-2 align-items-center">
        <Link
          to={`/profile/${notification?.senderUser}`}
          className=" text-white"
        >
          <div className="d-flex gap-2 align-items-center">
            <div className="img-container avater">
              {image !== "" && (
                <LazyLoadImage src={image} alt="" className="img-fluid" />
              )}
              {image === "" && (
                <LazyLoadImage
                  className="no-img img-fluid"
                  src={process.env.PUBLIC_URL + "../../person.png"}
                  alt=""
                />
              )}
            </div>
            <span>{username}</span>
          </div>
        </Link>
        {notification?.type === "like" && (
          <Link to={`${notification?.link}`} className=" text-white">
            <span>{notification?.text}</span>
          </Link>
        )}

        {notification?.type === "follow" && (
          <Link
            to={`/profile/${notification?.senderUser}`}
            className=" text-white"
          >
            <span>{notification?.text}</span>
          </Link>
        )}
      </div>
      <div className="text-white-50">
        {notification?.createdAt &&
          moment(new Date(notification.createdAt)).fromNow()}
      </div>
    </Dropdown.Item>
  );
}
export default Notification;
