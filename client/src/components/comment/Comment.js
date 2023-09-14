import React, { useEffect, useState, useContext } from "react";
import "./comment.css";
import axios from "axios";
import AuthContext from "../../helpers/authContext";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsFillReplyFill,
  BsThreeDotsVertical,
  BsSendFill,
} from "react-icons/bs";
import { Dropdown, Button } from "react-bootstrap";
import moment from "moment";
import { LinkContainer } from "react-router-bootstrap";
import Modal from "react-bootstrap/Modal";
import CommentForm from "./CommentForm";
import LikeButton from "./LikeButton";
import MessageModal from "../uiElements/messageModel";

function Comment({
  type,
  id,
  comment,
  replies,
  commentuserId,
  deleteComment,
  activeComments,
  setActiveComments,
  addComment,
  updateComment,
  userImage,
  loading,
  showEmojis,
  setShowEmojis,
  parentId = null,
}) {
  const { userId } = useContext(AuthContext);
  const [image, setImage] = useState(process.env.PUBLIC_URL + "/person.png");
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ text: null, state: "error" });

  const isReplying =
    activeComments &&
    activeComments.type === "replying" &&
    activeComments.id === comment._id;
  const isEditing =
    activeComments &&
    activeComments.type === "editing" &&
    activeComments.id === comment._id;
  const replyId = parentId ? parentId : comment._id;

  const [likes, setLikes] = useState(comment.likes.length);
  const [liked, setLiked] = useState(false);

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
          if (response?.data.message) {
            setMessage({
              text: response.data.message || "something want wrong",
              state: "error",
            });
          } else {
            setMessage({
              text: "something want wrong",
              state: "error",
            });
          }
          setLikes(likes);
          setLiked(liked);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data.message) {
          setMessage({
            text: err.response.data.message || "something want wrong",
            state: "error",
          });
        } else {
          setMessage({
            text: err.message || "something want wrong",
            state: "error",
          });
        }
        setLikes(likes);
        setLiked(liked);
      });
  };
  const handleClear = () => {
    setMessage({ text: null, state: "error" });
  };

  useEffect(() => {
    if (commentuserId) {
      fetchUser();
    }

    let userLiked = comment.likes.filter((item) => item === userId);

    if (userLiked.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [commentuserId]);

  const fetchUser = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${commentuserId}`,
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
  const handelShowDelete = () => setShowModal(true);
  const handleCloseDelete = () => setShowModal(false);
  const handleDeleteComment = (id) => {
    deleteComment(id);
    handleCloseDelete();
  };
  return (
    <>
      {message.text && <MessageModal message={message} onClear={handleClear} />}
      <Modal
        data-bs-theme="dark"
        show={showModal}
        onHide={handleCloseDelete}
        className="delete-modal "
      >
        <Modal.Body>
          <p className="text-center m-auto">
            Are you sure you want delete this comment?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteComment(comment._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="comment d-flex flex-column ">
        <div className="comment-container">
          <div className="comment-content d-flex gap-2 align-items-center mb-2">
            <LinkContainer
              to={`/profile/${commentuserId}`}
              className="cursor-pointer"
            >
              <div className="comment-image avater">
                <img className="img-fluid" src={image} alt="img" />
              </div>
            </LinkContainer>
            <LinkContainer
              to={`/profile/${commentuserId}`}
              className="nav-link cursor-pointer"
            >
              <div className="fw-bold">{username}</div>
            </LinkContainer>
            <div className="text-white-50">
              {comment?.createdAt &&
                moment(new Date(comment.createdAt)).fromNow()}
            </div>
            <div className="comment-action ms-auto d-flex align-items-center gap-2">
              {userId === commentuserId && (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <>
                      <Dropdown.Item>
                        <div
                          onClick={handelShowDelete}
                          className="cursor-pointer "
                        >
                          <BsFillTrashFill /> Delete
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div
                          className="cursor-pointer "
                          onClick={() => {
                            setShowEmojis(false);

                            setActiveComments({
                              id: comment._id,
                              type: "editing",
                            });
                          }}
                        >
                          <BsFillPencilFill /> Edit
                        </div>
                      </Dropdown.Item>
                    </>
                    <Dropdown.Item>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setShowEmojis(false);
                          setActiveComments({
                            id: comment._id,
                            type: "replying",
                          });
                        }}
                      >
                        <BsFillReplyFill /> Replay
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
          {!isEditing && <div className="comment-text">{comment?.text}</div>}
          {isEditing && (
            <CommentForm
              type={type}
              id={id}
              submitLabel={<BsFillPencilFill />}
              handleSubmit={(text) => updateComment(text, comment._id)}
              avaterUrl={userImage}
              setActiveComments={setActiveComments}
              kind="editing"
              value={comment?.text}
              loading={loading}
              activeComments={activeComments}
              showEmojis={showEmojis}
              setShowEmojis={setShowEmojis}
            />
          )}
          {userId && (
            <div className="d-flex gap-3">
              <div
                className="cursor-pointer text-white-50 reply d-flex align-items-center gap-1"
                onClick={() => {
                  setShowEmojis(false);
                  setActiveComments({
                    id: comment._id,
                    type: "replying",
                  });
                }}
              >
                <BsFillReplyFill />
                <span> Replay</span>
              </div>
              <LikeButton
                handleLike={handleLike}
                commentId={comment._id}
                likes={likes}
                liked={liked}
              />
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            type={type}
            id={id}
            submitLabel={<BsSendFill />}
            handleSubmit={(text) => addComment(text, replyId)}
            avaterUrl={userImage}
            setActiveComments={setActiveComments}
            kind="replying"
            loading={loading}
            activeComments={activeComments}
            showEmojis={showEmojis}
            setShowEmojis={setShowEmojis}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                type={type}
                id={id}
                commentuserId={reply.userId}
                comment={reply}
                key={reply._id}
                replies={[]}
                deleteComment={deleteComment}
                activeComments={activeComments}
                setActiveComments={setActiveComments}
                addComment={addComment}
                updateComment={updateComment}
                parentId={comment._id}
                userImage={userImage}
                loading={loading}
                showEmojis={showEmojis}
                setShowEmojis={setShowEmojis}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default Comment;
