import React, { useState, useEffect,useMemo } from 'react'
import * as MovieApi from '../../../api/MovieApi'

import SidebarLayout from '../../../components/sidebarLayout'
import Search from '../../../components/search'
import Loading from '../../../uiElements/preloading'
import RegisterModal from '../../../uiElements/RegisterModal'
import { Outlet, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import { BiFilterAlt } from 'react-icons/bi'
import { Dropdown as PrimDropdown } from 'primereact/dropdown'


function AllMovies (props) {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const [date, setDate] = useState('all')
  const [genre, setGenre] = useState([])
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [filteredGenre, setFilteredGenre] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
let countryArr=  useMemo(() => [], []);
  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className='d-flex align-items-center'>
          <img
            alt={option.name}
            src={option.image}
            className={`mr-2 flag flag-${option.code.toLowerCase()}`}
            style={{ width: '18px' }}
          />
          <div>{option.name}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const countryOptionTemplate = option => {
    return (
      <div className='d-flex align-items-center'>
        <img
          alt={option.name}
          src={option.image}
          className={`mr-2 flag flag-${option.code.toLowerCase()}`}
          style={{ width: '18px' }}
        />
        <div>{option.name}</div>
      </div>
    )
  }
  const handleChange = page => {
    setCurrentPage(page)
  }

  const handleClick = e => {
    setDate(e.target.value)
    setCurrentPage(1)
  }
  const checkimage = async url => {
    return await fetch(url, { mode: 'no-cors' })
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

  const loadGenreAndCountries = async () => {
    MovieApi.getGenre().then(data => {
      setGenre(data.genres)
    })
    MovieApi.getCountries().then(data => {
      console.log(data)
      let countries = data.map(item => {
        let country;
        checkimage(`https://flagsapi.com/${item.iso_3166_1}/flat/24.png`)
          .then(() => {
            countryArr.push({
              name: item.english_name,
              code: item.iso_3166_1,
              image: `https://flagsapi.com/${item.iso_3166_1}/flat/24.png`})
          })
          .catch(err =>     countryArr.push({
            name: item.english_name,
            code: item.iso_3166_1,
            image: `https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png`
          })
          )
   
    
      })
      console.log(countryArr)
      //     countries.forEach(element => {
      //       const x=checkimage(`https://flagsapi.com/${element.code}/flat/24.png`)
      //  console.log(x)

      //  });
      console.log(countries)
      setCountries(countryArr)
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

        <Search />
        <div className='p-3 mt-lg-5'>
          <div className='d-flex justify-content-between flex-wrap gap-1'>
            <Nav className='tv-list flex-nowrap flex-shrink-0'>
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
                  }}
                >
                  Upcoming
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <div className='filter-container d-flex gap-2 align-items-center'>
              <BiFilterAlt className='icon' />

              <Dropdown className='filter-dropdown'>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  Order
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className={date === 'all' ? 'active' : ''}>
                    <button
                      className='btn'
                      value='all'
                      onClick={e => handleClick(e)}
                    >
                      Order
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item className={date === 'latest' ? 'active' : ''}>
                    <button
                      className='btn'
                      value='latest'
                      onClick={e => handleClick(e)}
                    >
                      Latest
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item className={date === 'oldest' ? 'active' : ''}>
                    <button
                      className='btn'
                      value='oldest'
                      onClick={e => handleClick(e)}
                    >
                      Oldest
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <PrimDropdown
                value={selectedCountry}
                onChange={e => setSelectedCountry(e.value)}
                options={countries}
                optionLabel='name'
                placeholder='Select a Country'
                filter
                valueTemplate={selectedCountryTemplate}
                itemTemplate={countryOptionTemplate}
                className='w-full md:w-14rem'
              />
            </div>
          </div>

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
                      {item.name}
                    </button>
                  </div>
                )
              })}
          </div>

          <Outlet context={[date, handleChange, currentPage, filteredGenre]} />
        </div>
      </SidebarLayout>
    </>
  )
}

export default AllMovies
