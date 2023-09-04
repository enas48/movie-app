import React, { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../helpers/authContext";
import { LinkContainer } from "react-router-bootstrap";

function CommentForm({
  submitLabel,
  handleSubmit,
  avaterUrl,
  activeComments,
  setActiveComments,
}) {
  const { userId } = useContext(AuthContext);
  const [text, setText] = useState("");

  const isTextDisabled = text.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };

  useEffect(() => {}, []);

  return (
    <Form onSubmit={onSubmit} className="comments-form gap-2">
      <LinkContainer to={`/profile/${userId}`}>
        <div className="d-flex align-items-center me-1 gap-2">
          <div className="avater">
            <img src={avaterUrl} className="img-fluid" alt="" />
          </div>
        </div>
      </LinkContainer>
      <Form.Group className="w-100" controlId="formBasicEmail">
        <Form.Control
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a Comment..."
        />
      </Form.Group>
      {submitLabel === "Reply" && (
        <Button
          variant="secondary"
          className="rounded  d-flex align-items-center gap-2"
          onClick={() => setActiveComments(null)}
        >
          <span>cancel</span>
        </Button>
      )}
      <Button
        variant="primary"
        className="rounded custom-btn d-flex align-items-center gap-2"
        type="submit"
        disabled={isTextDisabled}
      >
        <span>{submitLabel}</span>
      </Button>
    </Form>
  );
}
export default CommentForm;
