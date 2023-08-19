import { useState } from 'react'
import { Link as LinkRouter, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { MdOutlineEmail, MdPerson } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { BsArrowRight } from 'react-icons/bs'

import MessageModal from '../uiElements/messageModel'

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4)
    .max(32)
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required('Password is mendatory')
    .min(4, 'Password must be at 4 char long'),
  confirmPassword: yup
    .string()
    .required('Password is mendatory')
    .oneOf([yup.ref('password')], 'Passwords does not match')
})

export default function SignupModal ({ page, openLogin }) {
  const [message, setMessage] = useState({ text: null, state: 'error' })
  let navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema)
  })
  const { errors } = formState

  const onSubmit = data => {
    console.log(data)

    axios
      .post(`${process.env.REACT_APP_APP_URL}/users`, data)
      .then(response => {
        console.log(response.data)
        if (response.data.status === 200) {
          console.log(response.data.message)
          setMessage({ text: response.data.message, state: 'success' })
          return navigate('/login', { replace: true })
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response.data?.message) {
          setMessage({
            text: err.response.data.message || 'something want wrong',
            state: 'error'
          })
        } else {
          setMessage({
            text: err.message || 'something want wrong',
            state: 'error'
          })
        }
      })
  }
  const handleClear = () => {
    setMessage({ text: null, state: 'error' })
  }

  return (
    <>
      {message.text && <MessageModal message={message} onClear={handleClear} />}
      <div className='form-container'>
        <div className=' form'>
          <h2 className='mb-4 text-center'>Sign up</h2>
          <div className='circle1'></div>
          <div className='circle2'></div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-4' controlId='formBasicname'>
              <div className='icon-container'>
                <span className='icon'>
                  <MdPerson />
                </span>
                <Form.Control
                  {...register('username')}
                  name='username'
                  type='text'
                  autoComplete='username'
                  placeholder='Enter your name'
                />
              </div>
              <Form.Text className='text-danger'>
                {errors.username?.message}
              </Form.Text>
            </Form.Group>

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

            <Form.Group className='mb-4' controlId='formBasicCPassword'>
              <div className='icon-container'>
                <span className='icon'>
                  <RiLockPasswordFill />
                </span>
                <Form.Control
                  {...register('confirmPassword')}
                  name='confirmPassword'
                  type='password'
                  autoComplete='current-Cpassword'
                  placeholder='Confirm Password'
                />
              </div>
              <Form.Text className='text-danger'>
                {errors.confirmPassword?.message}
              </Form.Text>
            </Form.Group>

            <Button
              variant='primary'
              className='mb-4 custom-btn d-flex align-items-center gap-2'
              type='submit'
            >
              <span>Sign up</span>
              <span className='icon'>
                <BsArrowRight />
              </span>
            </Button>
            <p>
              Already have an account?
              {page ? (
                <LinkRouter to='/login'>
                  <span> Login</span>
                </LinkRouter>
              ) : (
                <span
                  className='px-1 primary cursor-pointer'
                  onClick={openLogin}
                >
                  Login
                </span>
              )}
            </p>
          </Form>
        </div>
      </div>
    </>
  )
}
