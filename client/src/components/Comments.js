import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import AuthContext from "../helpers/authContext";
import Comment from "./Comment";
import { LinkContainer } from "react-router-bootstrap";
import CommentForm from "./CommentForm";

function Comments({ type, id }) {
  const { userId } = useContext(AuthContext);
  const [userImage, setImage] = useState(process.env.PUBLIC_URL + "/person.png");
  const [activeComments, setActiveComments] = useState(null);
  const [backendComments, setBackendComments] = useState([]);
  const [authorized, setAuthorized] = useState(true);

  const rootComments = backendComments
    .filter((c) => c.parentCommentId === null)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const getReplies = (commentId) => {
    return backendComments
      .filter((item) => item.parentCommentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId) => {
    if (!parentId) {
      parentId = null;
    }
    let comment = {
      userId: userId,
      text: text,
      post_id: id,
      type: type,
      parentCommentId: parentId,
    };

    axios
      .post(`${process.env.REACT_APP_APP_URL}/comments`, comment)
      .then((response) => {
        if (response?.status === 200) {
          setBackendComments([response.data.comment, ...backendComments]);
          setActiveComments(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = (commentId) => {
    console.log(commentId);
    axios
      .delete(`${process.env.REACT_APP_APP_URL}/comments/${commentId}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedComments = backendComments.filter(
            (item) => item._id !== commentId
          );
          setBackendComments(updatedComments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchComents = async () => {
    axios
      .get(`${process.env.REACT_APP_APP_URL}/comments/${type}/${id}`)
      .then((response) => {
        console.log(response);
        if (response?.status === 200) {
          setBackendComments(response.data.comments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUser = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${userId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (result.data.profile.image !== "") {
        setImage(result.data.profile.image);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(backendComments);
    if (!userId) {
      setAuthorized(false);
    }
    if (userId) {
      fetchUser();
    }
    fetchComents();
  }, [type, id, userId]);

  return (
    <div className="details-related-content ">
      <h3>Comments</h3>
      <div className="comments-container ">
        {!authorized && (
          <div className="login-comments d-flex align-items-center gap-2 justify-content-between flex-wrap ">
            <p className="mb-0">Login or signup to leave a comment</p>
            <div className="d-flex gap-2">
              <LinkContainer to="/login">
                <button className="btn  btn-outline rounded">Login</button>
              </LinkContainer>
              <LinkContainer to="/register">
                <button className="btn custom-btn rounded">Signup</button>
              </LinkContainer>
            </div>
          </div>
        )}
      </div>
      <div className="comments-container ">
        {authorized && (
          <CommentForm
            type={type}
            id={id}
            submitLabel="Add"
            handleSubmit={addComment}
            avaterUrl={userImage}
            setActiveComments={setActiveComments}
            activeComments={activeComments}
          />
        )}
      </div>
      <div className="comments-container">
        {rootComments.length === 0 && <div>No Comment yet</div>}
        {rootComments.map((item) => (
          <Comment
            type={type}
            id={id}
            commentuserId={item.userId}
            key={item._id}
            comment={item}
            replies={getReplies(item._id)}
            deleteComment={deleteComment}
            activeComments={activeComments}
            setActiveComments={setActiveComments}
            addComment={addComment}
            userImage={userImage}
          />
        ))}
      </div>
    </div>
  );
}
export default Comments;
