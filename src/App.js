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
        <ul className="list-container">
          {currentBlocks.map(collection => (
            <StoriesLink appList={collection} />
          ))}
          </ul>
          <Pagination
            totalRecords={totalBlockNumber}
            pageLimit={20}
            pageNeighbours={0}
            onPageChanged={this.onPageChanged}
          />
          {currentPage && (
            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
              Page <span className="font-weight-bold">{currentPage}</span> /{" "}
              <span className="font-weight-bold">{totalPages}</span>
            </span>
          )}
          <strong className="text-secondary">{totalBlockNumber}</strong>{" "}
          App Collections
      </div>
    )
  }
}

export default App;
