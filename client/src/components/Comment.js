import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import AuthContext from "../helpers/authContext";
import moment from "moment";
function Comment({ comment, replies }) {
  console.log(comment);
  useEffect(() => {}, []);

  return (
    <div className="comment d-flex flex-column ">
      <div className="comment-container">
        <div className="comment-content d-flex gap-2 align-items-center">
          <div className="comment-image avater">
            <img
              className="img-fluid"
              src={
                comment?.avatarUrl
                  ? comment.avatarUrl
                  : process.env.PUBLIC_URL + "./person.png"
              }
              alt="img"
            />
          </div>
          <div className="fw-bold">{comment?.fullName}</div>
          <div className="text-white-50">
            {comment?.createdAt &&
              moment(new Date(comment.createdAt)).fromNow()}
          </div>
        </div>
        <div className="comment-text">{comment?.text}</div>
      </div>

      {replies.length > 0 && (
        <div className="replies">
          {replies.map((reply) => (
            <Comment comment={reply} key={replies.id} replies={[]} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Comment;
