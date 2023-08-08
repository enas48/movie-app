import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../uiElements/preloading'
import MessageModal from '../uiElements/messageModel'
import Header from '../components/Header'
import { Link as LinkRouter,useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { MdOutlineEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import {BsArrowRight} from 'react-icons/bs';

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .min(4)
})

export default function Login ({ onLogin }) {
  const [loading, setLoading] = useState(true)
  let navigate = useNavigate()
  const [message, setMessage] = useState({ text: null, success: false })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

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

  const onSubmit = data => {
    console.log(data)
    axios
      .post(`${process.env.REACT_APP_APP_URL}/users/login`, data)
      .then(response => {
        console.log(response.data.status)
        if (response.data.status === 200) {
          onLogin(response.data)
          console.log(response.data.message)
          // setMessage({ text: response.data.message, success: true })
          setTimeout(function(){
            return navigate('/', { replace: true })
          },1000)
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response.data.message) {
          setMessage({
            text: err.response.data.message || 'something want wrong',
            success: false
          })
        } else {
          setMessage({
            text: err.message || 'something want wrong',
            success: false
          })
        }
      })
  }
  const handleClear = () => {
    setMessage({ text: null, success: false })
  }
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
            <h2 className='mb-4 text-center'>Login</h2>
            <div className='circle1'></div>
            <div className='circle2'></div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className='mb-4' controlId='formBasicEmail'>
                <div className='icon-container'>
                  <span className='icon'>
                    <MdOutlineEmail />
                  </span>
                  <Form.Control
                    {...register('email')}
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='Enter email'
                  />
                </div>
                <Form.Text className='text-danger'>
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-4' controlId='formBasicPassword'>
              <div className='icon-container'>
                  <span className='icon'>
                  <RiLockPasswordFill />
                  </span>
                <Form.Control
                  {...register('password')}
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  placeholder='Password'
                />
                </div>
                <Form.Text className='text-danger'>
                  {errors.password?.message}
                </Form.Text>
              </Form.Group>

              <Button
                variant='primary'
                className='mb-4 custom-btn d-flex align-items-center gap-2'
                type='submit'
              >   
                <span>Login</span>
                <span className='icon'>
                  <BsArrowRight />
                </span>
              </Button>
              <p>
                Don't have an account?
                <LinkRouter to='/register'>
                  <span> Sign up</span>
                </LinkRouter>{' '}
              </p>
            </Form>
          </div>
        </div>
      </>
    )
  }
}
