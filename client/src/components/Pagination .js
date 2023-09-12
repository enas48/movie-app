import React, { useState ,useEffect} from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { Form, Button } from 'react-bootstrap'
import { IoIosArrowForward } from 'react-icons/io'

const Paginations = ({ currentPage, totalPages, onPageChange }) => {
  const [value, setValue] = useState(currentPage)

  const handleSubmit = e => {
    e.preventDefault()
    onPageChange(Number(value))
  }
  const increase = () => {
    if (value < totalPages) {
      setValue(Number(value) + 1)
      onPageChange(Number(value) + 1)
    }
  }
  const decrease = () => {
    if (1 < value < totalPages) {
      setValue(Number(value) - 1)
      onPageChange(Number(value) - 1)
    }
  }
  function range (start, end) {
    var ans = []
    for (let i = start; i <= end; i++) {
      ans.push(i)
    }
    return ans
  }
  const getPageCut = ({ totalPages, pagesCutCount, currentPage }) => {
    const ceilling = Math.ceil(pagesCutCount / 2)
    const floor = Math.floor(pagesCutCount / 2)
    if (totalPages < pagesCutCount) {
      return { start: 1, end: totalPages }
    } else if (currentPage >= 1 && currentPage <= ceilling) {
      return { start: 1, end: pagesCutCount }
    } else if (currentPage + floor >= totalPages) {
      return { start: totalPages - pagesCutCount + 1, end: totalPages }
    } else {
      return { start: currentPage - ceilling + 1, end: currentPage + floor }
    }
  }
  let pageCut = getPageCut({ totalPages, pagesCutCount: 5, currentPage })
  let pages = range(pageCut.start, pageCut.end)



  return (
    <div className='d-flex justify-content-center gap-1 mt-2 flex-wrap'>
      <Pagination className='justify-content-center'>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => {
            setValue(1)
            onPageChange(1)
          }}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => {
            setValue(currentPage - 1)
            onPageChange(currentPage - 1)
          }}
        />
        {pages.map(number => (
          <Pagination.Item
            key={number}
            active={currentPage === number}
            onClick={() => {
              setValue(number)
              onPageChange(number)
            }}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => {
            setValue(currentPage + 1)
            onPageChange(currentPage + 1)
          }}
        />
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => {
            setValue(totalPages)
            onPageChange(totalPages)
          }}
        />
      </Pagination>
      <Form
        className='d-flex gap-2 align-items-center page-form mb-3'
        onSubmit={handleSubmit}
      >
        <Form.Group
          className='form-type-number'
          controlId='exampleForm.ControlInput1'
        >
          <Form.Control
            className='border-0 '
            required
            type='number'
            value={value}
            min={1}
            max={totalPages}
            onChange={e => setValue(e.target.value)}
            onKeyPress={e => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault()
              }
            }}
          />
          <div
            onClick={increase}
            className={`btn-plus ${value >= totalPages ? 'disabled' : ''}`}
          >
            +
          </div>
          <div
            onClick={decrease}
            className={`btn-minus  ${
              value <= 1 || value > totalPages ? 'disabled' : ''
            }`}
          >
            -
          </div>
        </Form.Group>

        <div className='page'> of {totalPages} pages</div>
        <Button type='submit' className='btn btn-outline p-0 text-secondry'>
          Go
          <IoIosArrowForward />
        </Button>
      </Form>
    </div>
  )
}

export default Paginations
