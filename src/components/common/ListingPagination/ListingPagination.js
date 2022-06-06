/* eslint-disable react/no-unstable-nested-components */
import React from "react"
import PropTypes from "prop-types"
import ReactPaginate from "react-paginate"

import "./ListingPagination.scss"

const ListingPagination = ({ pageCount, currentPage, handlePageClick }) => {
  return (
    <div className="mbc-listing-pagination">
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        forcePage={currentPage - 1}
        previousLabel="< Anterior"
        nextLabel="Urmator >"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link label"
        nextClassName="page-item"
        nextLinkClassName="page-link label"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

ListingPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
}

export default ListingPagination
