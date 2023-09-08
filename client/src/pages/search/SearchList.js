import React, { useState, useEffect } from "react";
import "./searchlist.css";
import SidebarLayout from "../../components/sidebar/sidebarLayout";
import Search from "../../components/search/search";
import Loading from "../../components/uiElements/preloading";
import Paginations from "../../components/Pagination ";
import { LinkContainer } from "react-router-bootstrap";
import { MdPerson } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { BiCameraMovie } from "react-icons/bi";
import { useParams } from "react-router-dom";
import * as MovieApi from "../../api/MovieApi";


function SearchList() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { query } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = async (currentPage) => {
    setIsLoading(true);
    MovieApi.Search(query, currentPage).then((data) => {
      if (data.total_pages >= 500) {
        setTotalPages(500);
      } else {
        setTotalPages(data.total_pages);
      }
      setList(data.results);
    });

    setIsLoading(false);
  };

  
  const handleChange = (page) => {
    setCurrentPage(page);
    loadData(page);
  };

  useEffect(() => {
    loadData(currentPage);
  }, [query, currentPage]);
  return (
    <>
      {isLoading && <Loading />}
      <SidebarLayout>
        <Search />
        <div className="search-page p-3 mt-lg-5">
          {list.length !== 0 && (
            <div className="">
              {list.map((item, i) => {
                return (
                  <div key={i} className="py-1">
                    {item?.media_type && (
                      <LinkContainer
                        key={i}
                        to={`/search/${item?.media_type}/${item.id}`}
                        state={{ data: item }}
                      >
                        <div className="cursor-pointer d-flex align-items-center gap-1 search-item">
                          {item.media_type === "movie" && (
                            <BiCameraMovie className="search-icon" />
                          )}
                          {item.media_type === "tv" && (
                            <PiTelevisionBold className="search-icon" />
                          )}
                          {item.media_type === "person" && (
                            <MdPerson className="search-icon" />
                          )}
                          <span>{item?.title}</span>
                          <span>{item?.name}</span>
                        </div>
                      </LinkContainer>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {list.length === 0 && (
            <div className="">
              <span className="p-3">No Results found</span>
            </div>
          )}
          <Paginations
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handleChange}
          />
        </div>
      </SidebarLayout>
    </>
  );
}

export default SearchList;
