import React, { useState, useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import * as MovieApi from '../api/MovieApi'
import { FiSearch } from 'react-icons/fi'
import { LinkContainer } from 'react-router-bootstrap'
import {MdLocalMovies,MdPerson} from 'react-icons/md'
import { PiTelevisionBold } from 'react-icons/pi'
function Search (props) {
  const [searchField, setSearchField] = useState('')
  const [searchList, setSearchList] = useState([])

  const handleChange = e => {
    // console.log(e.target.value)
    setSearchField(e.target.value)
    // setSearchList(data.results)
    MovieApi.Search(e.target.value).then(data => {
      // console.log(data)
      setSearchList(data.results)
    })
  }

  const handleSearch = () => {
    // console.log(searchField)

    MovieApi.Search(searchField).then(data => {
      // console.log(data)
      setSearchList(data.results)
    })
  }
  const handleKeyDown = e => {
    // e.preventDefault();
    if (e.key === 'Enter') {
      MovieApi.Search(searchField).then(data => {
        // console.log(data)
        setSearchList(data.results)
      })
    }
  }

  return (
    <div className='search-container'>
      <Form className='d-flex' onSubmit={e => e.preventDefault()}>
        <InputGroup className='mb-3'>
          <InputGroup.Text id='basic-addon1'>
            <Button variant='outline-light' onClick={handleSearch}>
              <FiSearch />
            </Button>
          </InputGroup.Text>
          <Form.Control
            placeholder={'Search'}
            aria-label='Username'
            value={searchField}
            aria-describedby='basic-addon1'
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
      </Form>
      {searchList.length !== 0 && (
        <div className='search-results'>
          {searchList.map((item, i) => {
            return (
              item?.media_type && (
                <LinkContainer
                  key={i}
                  to={`/search/${item.id}`}
                  state={{ data: item }}
                >
                  <div className='cursor-pointer d-flex align-items-center gap-1 search-item'>
                    {item.media_type==='movie' && <MdLocalMovies className='search-icon'/>}
                    {item.media_type==='tv' && <PiTelevisionBold className='search-icon'/>}
                    {item.media_type==='person' && <MdPerson className='search-icon'/>}
                    <span>{item?.title}</span>
                    <span>{item?.name}</span>
                  </div>
                </LinkContainer>
              )
            )
          })}
        </div>
      )}
      {searchList.length === 0 && searchField !== '' && (
        <div className='search-results'>
          <span>No Results found</span>
        </div>
      )}
    </div>
  )
}

export default Search
