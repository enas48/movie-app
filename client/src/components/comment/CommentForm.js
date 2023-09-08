import React, { useEffect, useState, useContext } from "react";
import "./comment.css";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../../helpers/authContext";
import { LinkContainer } from "react-router-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function CommentForm({
  submitLabel,
  handleSubmit,
  avaterUrl,
  setActiveComments,
  activeComments,
  kind,
  value = "",
  loading,
  showEmojis,
  setShowEmojis,
}) {
  const { userId } = useContext(AuthContext);
  const [text, setText] = useState(value);
  const isTextDisabled = text.length === 0;

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText(value);
  };

  useEffect(() => {}, []);

  return (
    <div style={{ position: "relative" }}>
      <Form
        onSubmit={onSubmit}
        className={
          kind === "editing"
            ? "comments-form gap-2 edit-form"
            : "comments-form gap-2"
        }
      >
        {kind !== "editing" && (
          <LinkContainer to={`/profile/${userId}`}>
            <div className="d-flex align-items-center me-1 gap-2">
              <div className="avater">
                <img src={avaterUrl} className="img-fluid" alt="" />
              </div>
            </div>
          </LinkContainer>
        )}
        <Form.Group className="w-100" controlId="formBasicEmail">
          <div className="icon-container d-flex">
            <Form.Control
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a Comment..."
              autoComplete="off"
              onFocus={() => {
                if (!(kind === "replying" || kind === "editing")) {
                  setActiveComments({
                    id: null,
                    type: "add",
                  });
                }
              }}
            />
            <span className="icon">
              {loading && kind === activeComments?.type && (
                <Spinner animation="border" />
              )}
            </span>
          </div>
        </Form.Group>

        <button
          className="btn p-0 me-1"
          disabled={!(kind === activeComments?.type)}
          onClick={(e) => {
            e.preventDefault();
            setShowEmojis(!showEmojis);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            style={{ width: "20px", color: "#eee" }}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        {kind !== "add" && (
          <Button
            variant="secondary"
            className="rounded  d-flex align-items-center  comment-btn"
            onClick={() => {
              setShowEmojis(false);
              setActiveComments({
                id: null,
                type: "add",
              });
            }}
          >
            <AiOutlineClose />
          </Button>
        )}
        <Button
          variant="primary"
          className="rounded custom-btn d-flex align-items-center comment-btn"
          type="submit"
          disabled={isTextDisabled}
        >
          <span>{submitLabel}</span>
        </Button>
      </Form>

      {showEmojis && kind === activeComments?.type && (
        <div className="emoji-container">
          <Picker data={data} onEmojiSelect={addEmoji} />
        </div>
      )}
    </div>
  );
}
export default CommentForm;
