import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Form, Button } from "react-bootstrap";
import {IoIosArrowForward} from 'react-icons/io'

const Paginations = ({ currentPage, totalPages, onPageChange }) => {
  const [value, setValue] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPageChange(Number(value))
    console.log(value);
  };
  function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }
  const getPageCut = ({ totalPages, pagesCutCount, currentPage }) => {
    const ceilling = Math.ceil(pagesCutCount / 2);
    const floor = Math.floor(pagesCutCount / 2);
    if (totalPages < pagesCutCount) {
      return { start: 1, end: totalPages };
    } else if (currentPage >= 1 && currentPage <= ceilling) {
      return { start: 1, end: pagesCutCount };
    } else if (currentPage + floor >= totalPages) {
      return { start: totalPages - pagesCutCount + 1, end: totalPages };
    } else {
      return { start: currentPage - ceilling + 1, end: currentPage + floor };
    }
  };
  let pageCut = getPageCut({ totalPages, pagesCutCount: 3, currentPage });
  let pages = range(pageCut.start, pageCut.end);
  console.log(pages);

  return (
    <div className="d-flex justify-content-center gap-1 mt-2">
      <Pagination className="justify-content-center">
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        {pages.map((number) => (
          <Pagination.Item
            key={number}
            active={currentPage === number}
            onClick={() => onPageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        />
      </Pagination>
      <Form
        className="d-flex gap-2 align-items-center mb-3"
        onSubmit={handleSubmit}
      >
        <Form.Group className="" controlId="exampleForm.ControlInput1">
          <Form.Control
            className="border-0"
            type="number"
            value={value}
            min={1}
            max={totalPages}
            onChange={(e) => setValue(e.target.value)}
            onkeypress="return event.charCode &gt;= 48 &amp;&amp; event.charCode &lt;= 57"
          />
        </Form.Group>

        <div> of {totalPages} pages</div>
        <Button
        type="submit"

          className="btn btn-outline p-0 text-secondry"
        >
          Go
          <IoIosArrowForward/>
        </Button>
      </Form>
    </div>
  );
};

export default Paginations;
