
import { useState, useEffect } from 'react'
import Loading from '../uiElements/preloading'
import MessageModal from "../uiElements/messageModel";
import { Link as LinkRouter } from "react-router-dom";
import { useForm  } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Header from '../components/Header'

const schema = yup.object().shape({
  username: yup.string().min(4).max(32).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(32).required(),
});


export default function Register() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: null, success: false });
    const { register, handleSubmit, formState: { errors },reset } = useForm({ resolver: yupResolver(schema),});
    
    useEffect(() => {
      // Loading function to load data or
      // fake it using setTimeout;
      const loadData = async () => {
        // Wait for two second
        await new Promise(r => setTimeout(r, 1000))
        // Toggle loading state
        setLoading(loading => !loading)
      }
      loadData()
    }, [])


  const onSubmit= data => {
    console.log(data);
  
    axios
      .post('http://localhost:8000/users', data)
      .then(response => {
        console.log(response.data)
        if (response.data.status===200) {
     
            console.log(response.data.message)
               setMessage({ text: response.data.message,error:false });
          
            reset();
          }
     
       
      })
      .catch(
        err => {
            console.log(err)
            if(err.response.data.message){
                setMessage({
                    text: err.response.data.message || "something want wrong",
                    success: false,
                  })    
            }else{

                setMessage({
                  text: err.message || "something want wrong",
                  success: false,
                })
            }
        }
      )

  }
  const handleClear = () => {
    setMessage({ text: null, error: false });
  };
  if (loading) {
    return <Loading />
  } else {
    return (
      <>
        {message.text && (
          <MessageModal message={message} onClear={handleClear} />
        )}
        <Header />
        <div className='form-container'>
          <div className=' form'>
            <h2 className='mb-4 text-center'>Sign up</h2>
            <div className='circle1'></div>
            <div className='circle2'></div>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-4' controlId='formBasicEmail'>
                {/* <Form.Label>Name</Form.Label> */}
                <Form.Control
                  {...register('username')}
                  name='username'
                  type='text'
                  autoComplete='username'
                  placeholder='Enter your name'
                />
                <Form.Text className='text-danger'>
                  {errors.username?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-4' controlId='formBasicEmail'>
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  {...register('email')}
                  name='email'
                  type='email'
                  autoComplete='email'
                  placeholder='Enter email'
                />
                <Form.Text className='text-danger'>
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-5' controlId='formBasicPassword'>
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                  {...register('password')}
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  placeholder='Password'
                />
                <Form.Text className='text-danger'>
                  {errors.password?.message}
                </Form.Text>
              </Form.Group>

              <Button
                variant='primary'
                className='mb-4 custom-btn'
                type='submit'
              >
                Sign up
              </Button>
              <p>
                Already have an account?
                <LinkRouter to='/login'>
                  <span> Login</span>
                </LinkRouter>{' '}
              </p>
            </Form>
          </div>
        </div>
      </>
    )
  }
   
    
  }