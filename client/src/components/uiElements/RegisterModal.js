import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import LoginModal from "./loginModal";
import SignupModal from "./SignupModal";
import './modal.css'
function RegisterModal(props) {
  const [show, setShow] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(true);

  const handleClose = () => {
    props.handleCloseModal();
  };
  const openSignup = () => {
    setLogin(false);
    setSignUp(true);
  };
  const openLogin = () => {
    setSignUp(false);
    setLogin(true);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {login && <LoginModal page={false} openSignup={openSignup} />}
          {signup && <SignupModal page={false} openLogin={openLogin} />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterModal;
