import React, { Component } from 'react';
import './App.css';
import Collections from './scraped.json'
import StoriesLink from './StoriesLink';
import Pagination from './Pagination.js';

class App extends Component {
  state = {
    totalBlocks: [],
    currentBlocks: [],
    currentPage: null,
    totalPages: null
  };

  componentDidMount() {
    const totalBlocks = Collections.appList;
    this.setState({ totalBlocks });
  }

  onPageChanged = data => {
    const { totalBlocks } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentBlocks = totalBlocks.slice(offset, offset + pageLimit);
    
    this.setState({ currentPage, currentBlocks, totalPages });
  };

  render() {
    const {
      totalBlocks,
      currentBlocks,
      currentPage,
      totalPages
    } = this.state;
    const totalBlockNumber = totalBlocks.length;
    
    if ( totalBlockNumber === 0) return null;

    return (
      <div className="App">
        <h1 className="page-title">App Store App Collections</h1>
        <Pagination
              totalRecords={totalBlockNumber}
              pageLimit={20}
              pageNeighbours={0}
              onPageChanged={this.onPageChanged}
            />
        <ul className="list-container">
          {currentBlocks.map(collection => (
            <StoriesLink appList={collection} />
          ))}
          </ul>
          <footer>
            {currentPage && (
              <div className="footerInfo">
                Page <span>{currentPage}</span> of {" "}
                <span>{totalPages}</span>
                <div>{totalBlockNumber} {" "}App Collections</div>
              </div>
            )}
          </footer>
      </div>
    )
  }
}

export default App;
