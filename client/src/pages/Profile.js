import React, { useContext } from "react";
import SidebarLayout from "../components/sidebarLayout";
import { useState, useEffect } from "react";
import Loading from "../uiElements/preloading";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthContext from "../helpers/authContext";
import { AiFillCamera } from "react-icons/ai";
import axios from 'axios'

function Profile(props) {
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [data, setFormData] = useState({ image: "", username: "" });
  const { username } = data;
  const fetchUser = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/profile/users/${userId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      //get user
      console.log(result.data)
      if (result.data.profile) {
        setFormData({
          image: result.data.profile.image,
          username: result.data.profile.user.username,
        });
        setImage(result.data.profile.user.image);
     
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchUser()
    }
    console.log(data);
    // Loading function to load data or
    const loadData = async () => {
      // Wait for two second
      await new Promise((r) => setTimeout(r, 1000));
      setLoading((loading) => !loading);
    };
    loadData();
  }, []);

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
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
    formData.append("image", image);
  };

  return (
    <>
      {loading && <Loading />}
      <SidebarLayout>
        <h3 className="px-4">Profile</h3>
        <div className="form-container">
          <div className=" form">
            <h2 className="mb-4 text-center">Edit Profile</h2>
            <div className="circle1"></div>
            <div className="circle2"></div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formimage">
                <div className="profile-container">
                  <AiFillCamera className="icon" />
                  <div className="overlay"></div>
                  <input type="file" name="image" onChange={onImageChange} />
                  <div className="profile-image">
                    <img
                      src={
                        data.image === ""
                          ? process.env.PUBLIC_URL + "./person.png"
                          : data.image
                      }
                      alt=""
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicusername">
                <Form.Control
                  value={username}
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="username"
                  onChange={onChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="mb-4 custom-btn d-flex align-items-center gap-2"
                type="submit"
              >
                Edit
              </Button>
            </Form>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}

export default Profile;
