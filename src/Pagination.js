import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.computePageState();
    this.state = { currentPage: 1 };
  }

  computePageState = () => {
    const {
      totalRecords = null,
      pageLimit = 30,
      pageNeighbours = 0,
    } = this.props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
  };

  componentDidMount() {
    this.gotoPage(1);
  }

  componentDidUpdate(prevProps) {
    const { shouldResetPrev } = prevProps;
    const { shouldReset } = this.props;
    if (shouldResetPrev !== shouldReset && shouldReset) {
      this.computePageState();
      this.gotoPage(1);
    }
  }

  gotoPage = page => {
    const { onPageChanged = f => f, shouldReset } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords,
      shouldReset,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  };

  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      // const pagesCount = pages.length;
      // const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        // const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, rightSpillPage];
      } else if (!leftSpill && rightSpill) {
        // const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [leftSpillPage, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    // const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav aria-label="Pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <button
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span>Previous</span>
                    </button>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <button
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={this.handleMoveRight}
                    >
                      <span>Next</span>
                    </button>
                  </li>
                );

              // return (
              //   <li
              //     key={index}
              //     className={`page-item${
              //       currentPage === page ? " active" : ""
              //     }`}
              //   >
              //     {/* <a
              //       className="page-link"
              //       href="#"
              //       onClick={e => this.handleClick(page, e)}
              //     >
              //       {page}
              //     </a> */}
              //   </li>
              // );
            })}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Pagination;
