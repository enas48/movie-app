import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

import MessageModal from "../../components/uiElements/messageModel";
import Loading from "../../components/uiElements/preloading";

import AuthContext from "../../helpers/authContext";

import { AiFillCamera } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";
import "./profile.css";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function EditProfile({ handleUpdate, setEdit }) {
  const [loading, setLoading] = useState(false);
  const { userId, userProfile } = useContext(AuthContext);
  const { id } = useParams();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [data, setFormData] = useState({ username: "", user: userId });
  const { username } = data;
  const [file, setFile] = useState(null);
  const [bgfile, setbgFile] = useState(null);
  const [bgfileDataURL, setbgFileDataURL] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [message, setMessage] = useState({ text: null, state: "error" });
  const [profileId, setProfileId] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      setMessage({ text: "Image is not valid", state: "error" });
      return;
    }
    console.log(file);
    setFile(file);
    setProfileImage(file);
  };

  const onBgChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      setMessage({ text: "Image is not valid", state: "error" });
      return;
    }
    console.log(file);
    setbgFile(file);
    setCoverImage(file);
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    if (file) {
      formData.append("profileImage", file);
    } else {
      formData.append("profileImage", profileImage);
    }
    if (bgfile) {
      formData.append("coverImage", bgfile);
    } else {
      formData.append("coverImage", coverImage);
    }
    setDisabled(true);

    axios
      .put(process.env.REACT_APP_APP_URL + "/profile/" + profileId, formData)
      .then((response) => {
        if (response?.data.status === 200) {
          setMessage({ text: response.data.message, state: "success" });
          setDisabled(false);
          handleUpdate();
          setTimeout(() => {
            setEdit(false);
          }, 5000);
        }
      })
      .catch((err) => {
        setDisabled(false);
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
      });
  };

  const handleClear = () => {
    setMessage({ text: null, state: "error" });
  };

  useEffect(() => {
    if (id !== userId) {
      navigate(`/profile/${id}`);
    }
    if (id && userProfile) {
      setLoading(true);
      setFormData({
        ...data,
        username: userProfile?.user.username,
      });
      setProfileImage(userProfile?.profileImage);
      setCoverImage(userProfile?.coverImage);
      console.log(userProfile);
      setProfileId(userProfile?._id);
      setLoading(false);
    }
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    if (bgfile) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setbgFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(bgfile);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, bgfile, id, userProfile]);

  return (
    <>
      {loading && <Loading />}
      {message.text && <MessageModal message={message} onClear={handleClear} />}
      {/* <SidebarLayout>
        <Search /> */}
      <div className="header-bg">
        <Form onSubmit={handleSubmit} multi className=" ">
          <Form.Group className="edit-cover">
            <div className="profile-container ">
              <div className="cover-btn ">
                <span>Update cover image</span>

                <div className="icon-container">
                  <AiFillCamera className="icon" />
                </div>
              </div>
              {/* <div className="overlay"></div> */}
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={onBgChange}
              />
              <div className="profile-image">
                <div className="overlay"></div>
                {!bgfileDataURL && coverImage !== "" && (
                  <img src={coverImage} alt="" />
                )}
                {bgfileDataURL && <img src={bgfileDataURL} alt="" />}
              </div>
            </div>
          </Form.Group>
          <div className=" profile-header container">
            <Form.Group className="" controlId="formimage">
              <div className="profile-container">
                <div className="icon-container">
                  <AiFillCamera className="icon" />
                </div>
                {/* <div className="overlay"></div> */}
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={onImageChange}
                />
                <div className="profile-image">
                  {!fileDataURL && (
                    <img
                      src={
                        profileImage === ""
                          ? process.env.PUBLIC_URL + "../../person.png"
                          : profileImage
                      }
                      alt=""
                    />
                  )}
                  {fileDataURL && <img src={fileDataURL} alt="" />}
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3 position-relative"
              controlId="formBasicusername"
            >
              <Form.Control
                value={username}
                name="username"
                type="text"
                autoComplete="username"
                placeholder="username"
                onChange={onChange}
              />
              <Button
                type="submit"
                className="edit-icon btn-outline"
                disabled={disabled}
              >
                <BiSolidEditAlt />
              </Button>
            </Form.Group>
            <Button
              variant="primary"
              className="mb-3 custom-btn d-flex align-items-center gap-2 ms-auto"
              type="submit"
              disabled={disabled}
            >
              Edit Profile
            </Button>
          </div>
        </Form>
      </div>

      {/* </SidebarLayout> */}
    </>
  );
}

export default EditProfile;
