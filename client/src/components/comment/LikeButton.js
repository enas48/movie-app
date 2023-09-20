import "./comment.css";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../helpers/authContext";
import { AiFillLike } from "react-icons/ai";

function LikeButton({
  commentId,
  id,
  commentLikes,
  postType,
  setShowEmojis,
}) {
  const [likes, setLikes] = useState(commentLikes.length);
  const [liked, setLiked] = useState(false);
  const { userId } = useContext(AuthContext);

  const handleLike = (commentId) => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
      updateCommentLike(commentId, "unlike");
    } else {
      setLikes(likes + 1);
      setLiked(true);
      updateCommentLike(commentId, "like");
    }
  };

  const updateCommentLike = async (commentId, type) => {
    let comment = {
      userId: userId,
      post_id: id,
      type: postType,
    };
    axios
      .put(
        `${process.env.REACT_APP_APP_URL}/comments/${type}/${commentId}`,
        comment
      )
      .then((response) => {
        setShowEmojis(false);
        if (response?.status === 200) {
        } else {
          console.log(response?.data.message);
          setLikes(likes);
          setLiked(liked);
        }
      })
      .catch((err) => {
        console.log(err);

        setLikes(likes);
        setLiked(liked);
      });
  };

  useEffect(() => {
    let userLiked = commentLikes.filter((item) => item === userId);
    if (userLiked.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    setLikes(commentLikes.length);
  }, [commentLikes, userId]);

  return (
    <div className="d-flex align-items-center gap-1">
      <span>{likes} </span>

      <button
        className={`like-button btn p-0 text-white-50 `}
        onClick={() => {
          handleLike(commentId);
        }}
      >
        <AiFillLike className={` like ${liked ? "text-secondry" : ""}`} />
      </button>
    </div>
  );
}
export default LikeButton;
