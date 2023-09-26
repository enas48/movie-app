import React, { useState, useEffect, useContext } from 'react'
import * as MovieApi from '../../../api/MovieApi'

import SidebarLayout from '../../../components/sidebar/sidebarLayout'
import Search from '../../../components/search/search'
import Loading from '../../../components/uiElements/preloading'
import RegisterModal from '../../../components/uiElements/RegisterModal'
import { Outlet, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import AccordionContext from 'react-bootstrap/AccordionContext'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'

import { BiFilterAlt, BiPlus } from 'react-icons/bi'
import { MdDone } from 'react-icons/md'
import { Dropdown } from 'primereact/dropdown'

function ContextAwareToggle ({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext)

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  )

  const isCurrentEventKey = activeEventKey === eventKey

  return (
    <button
      type='button'
      className={
        isCurrentEventKey
          ? 'btn genre-btn filter-btn  active'
          : 'btn genre-btn filter-btn '
      }
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  )
}

function AllMovies (props) {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const [date, setDate] = useState('all')
  const [genre, setGenre] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [country, setCountry] = useState('US')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filteredGenre, setFilteredGenre] = useState([])

  const selectedTemplate = (option, props) => {
    if (option) {
      return (
        <>
          <div className='d-flex align-items-center gap-1'>
            {props.placeholder === 'Select a Country' && (
              <button
                className='btn text-danger py-0 px-1 '
                onClick={e => {
                  e.preventDefault()
                  setSelectedCountry(null)
                  setCountry('US')
                  setCurrentPage(1)
                }}
              >
                X
              </button>
            )}

            <div>{option.name}</div>
          </div>
        </>
      )
    }
    return <span>{props.placeholder}</span>
  }

  const OptionTemplate = option => {
    return (
      <div className='d-flex align-items-center'>
        <div>{option.name}</div>
      </div>
    )
  }

  const handleChange = page => {
    setCurrentPage(page)
  }

  const handleGenre = (e, id) => {
    if (filteredGenre.includes(id)) {
      let filtered = filteredGenre.filter(item => {
        return item !== id
      })
      setFilteredGenre(filtered)
    } else {
      setFilteredGenre([...filteredGenre, id])
    }
    setCurrentPage(1)
  }

  //intilize get data from api
  const loadGenreAndCountries = async () => {
    MovieApi.getGenre().then(data => {
      setGenre(data.genres)
    })
    MovieApi.getCountries().then(data => {
      // let countries = data.map(item => {
      //
      //   return { name: item.english_name, code: item.iso_3166_1 }
      // })

      let countries = [
        { name: 'America', code: 'US' },
        { name: 'Egypt', code: 'EG' },
        { name: 'United Kingdom', code: 'GB' }
        // { name: 'Germany', code: 'DE' },
        // { name: 'France', code: 'FR' },
        // { name: 'Spain', code: 'ES' },
        // { name: 'United Kingdom', code: 'GB' },
        // { name: 'India', code: 'IN' },
        // { name: 'Italy', code: 'IT' },
        // { name: 'Japan', code: 'JP' },
        // { name: 'korea', code: 'KR' },
        // { name: 'Lebanon', code: 'LB' },
        // { name: 'Mexico', code: 'MX' },
        // { name: 'Russia', code: 'RU' },
        // { name: 'Thailand', code: 'TH' },
        // { name: 'Turkey', code: 'TR' },
        // { name: 'Taiwan', code: 'TW' },
        // { name: 'Vietnam', code: 'VN' },
      ]
      setCountries(countries)
    })
  }

  useEffect(() => {
    const loadData = async () => {
      await new Promise(r => setTimeout(r, 800))
      setIsLoading(false)
    }
    loadGenreAndCountries()
    loadData()
  }, [date, filteredGenre])

  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <RegisterModal show={props.show} handleCloseModal={props.handleClose} />
        {/* 
        <Search /> */}
        <div className='p-3 container'>
          <div className='d-flex justify-content-between flex-wrap mb-2'>
            <Nav className='tv-list flex-nowrap flex-shrink-0 mb-3'>
              <LinkContainer to='trending'>
                <Nav.Link
                  className={
                    location.pathname.includes('trending') ||
                    (location.pathname.includes('allmovies') &&
                      !location.pathname.includes('topRated') &&
                      !location.pathname.includes('upcoming'))
                      ? 'active'
                      : ''
                  }
                  onClick={() => {
                    setCurrentPage(1)
                    setDate('all')
                    setSelectedOrder({ name: 'All' })
                    setSelectedCountry(null)
                    setCountry('US')
                    setFilteredGenre([])
                  }}
                >
                  Trending
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='topRated'>
                <Nav.Link
                  className={
                    location.pathname.includes('topRated') ? 'active' : ''
                  }
                  onClick={() => {
                    setCurrentPage(1)
                    setDate('all')
                    setSelectedOrder({ name: 'All' })
                    setSelectedCountry(null)
                    setCountry('US')
                    setFilteredGenre([])
                  }}
                >
                  Top Rated
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='upcoming'>
                <Nav.Link
                  className={
                    location.pathname.includes('upcoming') ? 'active' : ''
                  }
                  onClick={() => {
                    setCurrentPage(1)
                    setDate('all')
                    setSelectedOrder({ name: 'All' })
                    setSelectedCountry(null)
                    setCountry('US')
                    setFilteredGenre([])
                  }}
                >
                  Upcoming
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <div className='filter-container d-flex gap-2 align-items-center mb-2'>
              <BiFilterAlt className='icon' />

              <Dropdown
                value={selectedOrder}
                onChange={e => {
                  setSelectedOrder(e.value)
                  setDate(e.value.name.toLowerCase())
                  setCurrentPage(1)
                }}
                options={[
                  { name: 'All' },
                  { name: 'Latest' },
                  { name: 'Oldest' }
                ]}
                optionLabel='Order'
                placeholder='Order'
                valueTemplate={selectedTemplate}
                itemTemplate={OptionTemplate}
                className='w-full md:w-14rem'
              />
              <Dropdown
                value={selectedCountry}
                onChange={e => {
                  setSelectedCountry(e.value)
                  setCountry(e.value.code)
                  setCurrentPage(1)
                }}
                options={countries}
                optionLabel='name'
                placeholder='Select a Country'
                filter
                valueTemplate={selectedTemplate}
                itemTemplate={OptionTemplate}
                className='w-full md:w-14rem'
              />
            </div>
          </div>
          <Accordion defaultActiveKey='0'>
            <ContextAwareToggle eventKey='1'>Genre</ContextAwareToggle>

            <Accordion.Collapse eventKey='1'>
              <div className='d-flex justify-content-center gap-3 flex-wrap mt-4'>
                {genre.length !== 0 &&
                  genre.map((item, i) => {
                    return (
                      <div key={item.id}>
                        {filteredGenre.includes(item.id)}
                        <button
                          className={
                            filteredGenre.includes(item.id)
                              ? 'm-auto btn active text-nowrap filter-btn'
                              : ' btn m-auto text-nowrap filter-btn'
                          }
                          onClick={e => handleGenre(e, item.id)}
                        >
                          {filteredGenre.includes(item.id)}
                          {item.name}&nbsp;
                          {filteredGenre.includes(item.id) ? (
                            <MdDone className='icon' />
                          ) : (
                            <BiPlus className='icon' />
                          )}
                        </button>
                      </div>
                    )
                  })}
              </div>
            </Accordion.Collapse>
          </Accordion>
          <div className='d-flex justify-content-center gap-3 flex-wrap mt-4 genre-container'>
            {genre.length !== 0 &&
              genre.map((item, i) => {
                return (
                  <div key={item.id}>
                    {filteredGenre.includes(item.id)}
                    <button
                      className={
                        filteredGenre.includes(item.id)
                          ? 'm-auto btn active text-nowrap filter-btn'
                          : ' btn m-auto text-nowrap filter-btn'
                      }
                      onClick={e => handleGenre(e, item.id)}
                    >
                      {filteredGenre.includes(item.id)}
                      {item.name}&nbsp;
                      {filteredGenre.includes(item.id) ? (
                        <MdDone className='icon' />
                      ) : (
                        <BiPlus className='icon' />
                      )}
                    </button>
                  </div>
                )
              })}
          </div>

          <Outlet
            context={[date, country, handleChange, currentPage, filteredGenre]}
          />
        </div>
      </SidebarLayout>
    </>
  )
}

export default AllMovies
