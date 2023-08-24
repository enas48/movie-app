import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Pagination className="justify-content-center">
        <Pagination.First  onClick={() => onPageChange(1)} />
        <Pagination.Prev />
        <Pagination.Item className={currentPage===1?'active':''} onClick={() => onPageChange(1)}>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item >{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item >{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item  className={currentPage===totalPages?'active':''} onClick={() => onPageChange(totalPages)}>{totalPages}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last onClick={() => onPageChange(totalPages)} />
      </Pagination>

      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={currentPage === number ? "active" : ""}
              onClick={() => onPageChange(number)}
            >
              {number}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Paginations;
