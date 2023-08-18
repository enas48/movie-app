import { useState, useEffect } from "react";
import axios from "axios";
import MessageModal from "../uiElements/messageModel";
import { Link as LinkRouter, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(4),
});

export default function LoginModal({ onLogin, page, openSignup }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [message, setMessage] = useState({ text: null, state: "error" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setTimeout(() => {
      if (["/profile", "/bookmark"].includes(location.state?.prevPath)) {
        setMessage({
          text: "You Need To Login First!",
          state: "warning",
        });
      }
    }, 1300);
  }, [location]);

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_APP_URL}/users/login`, data)
      .then((response) => {
        console.log(response.data.status);
        if (response.data.status === 200) {
          onLogin(response.data);
          setTimeout(function () {
            return navigate("/", { replace: true });
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
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
      });
  };
  const handleClear = () => {
    setMessage({ text: null, state: "error" });
  };

  return (
    <>
      {message.text && <MessageModal message={message} onClear={handleClear} />}

      <div className="form-container">
        <div className=" form">
          <h2 className="mb-4 text-center">Login</h2>
          <div className="circle1"></div>
          <div className="circle2"></div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <div className="icon-container">
                <span className="icon">
                  <MdOutlineEmail />
                </span>
                <Form.Control
                  {...register("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter email"
                />
              </div>
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <div className="icon-container">
                <span className="icon">
                  <RiLockPasswordFill />
                </span>
                <Form.Control
                  {...register("password")}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                />
              </div>
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              className="mb-4 custom-btn d-flex align-items-center gap-2"
              type="submit"
            >
              <span>Login</span>
              <span className="icon">
                <BsArrowRight />
              </span>
            </Button>
            <p>
              Don't have an account?
              {page ? (
                <LinkRouter to="/register">
                  <span> Sign up</span>
                </LinkRouter>
              ) : (
                <span
                  className="px-1 primary cursor-pointer"
                  onClick={openSignup}
                >
                  Sign up
                </span>
              )}
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
