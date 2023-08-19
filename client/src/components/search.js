import React, { useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import { FiSearch } from 'react-icons/fi'

function Searrch (props) {
  return (
    <Form className='d-flex'>
      <InputGroup className='mb-3'>
        <InputGroup.Text id='basic-addon1'>
          <Button variant='outline-light'>
            <FiSearch />
          </Button>
        </InputGroup.Text>
        <Form.Control
          placeholder={props.label || 'Search'}
          aria-label='Username'
          aria-describedby='basic-addon1'
        />
      </InputGroup>
    </Form>
  )
}

export default Searrch
