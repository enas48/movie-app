import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import AuthContext from "../helpers/authContext";
import Comment from "./Comment";

function Comments({ type, id, currentUserId }) {
  const [backendComments, setBackendComments] = useState([]);
  const rootComments = backendComments.filter(
    (c) => c.parentCommentId === null
  );
  const getReplies = (commentId) => {
    return backendComments
      .filter((item) => item.parentCommentId === commentId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_APP_URL}/comments/${type}/${id}`)
      .then((response) => {
        if (response?.status === 200) {
          setBackendComments(response.data.comments);
          // setMessage({ text: response.data.message, state: 'success' })
          // return navigate('/login', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err);
        //   if (err.response?.data.message) {
        //     setMessage({
        //       text: err.response.data.message || 'something want wrong',
        //       state: 'error'
        //     })
        //   } else {
        //     setMessage({
        //       text: err.message || 'something want wrong',
        //       state: 'error'
        //     })
        //   }
      });
  }, []);

  return (
    <div className="details-related-content container">
      <div className="comments">
        <h3>Comments</h3>
        <div className="comments-container">
          {rootComments.map((item) => (
            <Comment key={item._id} comment={item} replies={getReplies(item._id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Comments;
