import React, { useEffect, useState, useContext,useRef  } from "react";
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
import { LinkContainer  } from "react-router-bootstrap";
import { useLocation } from 'react-router-dom'
import Modal from "react-bootstrap/Modal";
import CommentForm from "./CommentForm";
import LikeButton from "./LikeButton";
import MessageModal from "../uiElements/messageModel";
import LikeList from "./LikeList";

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
  const ref = useRef(null);
  const { userId } = useContext(AuthContext);
  const [image, setImage] = useState(process.env.PUBLIC_URL + "/person.png");
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ text: null, state: "error" });
  const location = useLocation()
  const  commentId  = location?.state?.commentId
  console.log(commentId)
  const isReplying =
    activeComments &&
    activeComments.type === "replying" &&
    activeComments.id === comment._id;
  const isEditing =
    activeComments &&
    activeComments.type === "editing" &&
    activeComments.id === comment._id;
  const replyId = parentId ? parentId : comment._id;

  const handleClear = () => {
    setMessage({ text: null, state: "error" });
  };
  function scrollToId(itemId) {
    console.log(itemId)
    const map = getMap();
    const node = map.get(itemId);
    console.log(node)
    node?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function getMap() {
    if (!ref.current) {
      // Initialize the Map on first usage.
      ref.current = new Map();
    }
    return ref.current;
  }

  useEffect(() => {
    if (commentuserId) {
      fetchUser();
    }
 
    if(commentId){
      scrollToId(commentId)
    }

  }, [commentuserId, comment]);

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
        <div className="comment-container" id={comment._id} ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(comment?._id, node);
                } else {
                  map.delete(comment?._id);
                }
              }}  >
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
                commentId={comment._id}
                id={id}
                commentLikes={comment.likes}
                postType={type}
                setShowEmojis={setShowEmojis}
                comment={comment}
              />
              {comment.likes.length !== 0 && (
                <div className="ms-auto">
                  <LikeList
                    commentId={comment._id}
                    id={id}
                    commentLikes={comment.likes}
                    postType={type}
                    setShowEmojis={setShowEmojis}
                  />
                </div>
              )}
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
