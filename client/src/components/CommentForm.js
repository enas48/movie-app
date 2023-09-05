import React, { useEffect, useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import AuthContext from '../helpers/authContext'
import { LinkContainer } from 'react-router-bootstrap'
import { AiOutlineClose } from 'react-icons/ai'
import Spinner from 'react-bootstrap/Spinner'

function CommentForm ({
  submitLabel,
  handleSubmit,
  avaterUrl,
  setActiveComments,
  activeComments,
  kind,
  value = '',
  loading
}) {
  const { userId } = useContext(AuthContext)
  const [text, setText] = useState(value)
console.log(activeComments)

  const isTextDisabled = text.length === 0
  console.log(kind)
  const onSubmit = e => {
    e.preventDefault()
    handleSubmit(text)

    setText(value)
  }
  console.log(kind)
  useEffect(() => {}, [])

  return (
    <>
      <Form
        onSubmit={onSubmit}
        className={
          kind === 'editing'
            ? 'comments-form gap-2 edit-form'
            : 'comments-form gap-2'
        }
      >
        {kind !== 'editing' && (
          <LinkContainer to={`/profile/${userId}`}>
            <div className='d-flex align-items-center me-1 gap-2'>
              <div className='avater'>
                <img src={avaterUrl} className='img-fluid' alt='' />
              </div>
            </div>
          </LinkContainer>
        )}
        <Form.Group className='w-100' controlId='formBasicEmail'>
          <div className='icon-container d-flex'>
            <Form.Control
              type='text'
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder='Add a Comment...'
              autoComplete='off'
            />
            <span className='icon'>
              {loading && kind===activeComments?.type && <Spinner animation='border' />}

            </span>
          </div>
        </Form.Group>
        {kind !== 'add' && (
          <Button
            variant='secondary'
            className='rounded  d-flex align-items-center  comment-btn'
            onClick={() => setActiveComments(null)}
          >
            <AiOutlineClose />
          </Button>
        )}
        <Button
          variant='primary'
          className='rounded custom-btn d-flex align-items-center comment-btn'
          type='submit'
          disabled={isTextDisabled}
        >
          <span>{submitLabel}</span>
        </Button>
      </Form>
    </>
  )
}
export default CommentForm
