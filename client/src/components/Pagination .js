import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = ({ currentPage, totalPages, onPageChange }) => {
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

  return (
    <>
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
    </>
  );
};

export default Paginations;
