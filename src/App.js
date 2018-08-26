import React, { Component } from "react";
import * as JsSearch from "js-search";
import "./App.css";
import Collections from "./scraped.json";
import StoriesLink from "./StoriesLink";
import Pagination from "./Pagination.js";

class App extends Component {
  state = {
    totalBlocks: [],
    currentBlocks: [],
    currentPage: null,
    totalPages: null,
    searchText: "",
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

    this.setState({
      currentPage,
      currentBlocks,
      totalPages,
      shouldReset: false,
    });
  };

  onSearchTextChange = e => {
    const searchText = e.target.value;
    this.setState({ searchText });
    let nextState = {
      shouldReset: true,
    };
    if (searchText.trim().length > 2) {
      const totalBlocks = search.search(searchText);
      nextState = {
        totalBlocks,
        currentBlocks: [],
        currentPage: null,
        totalPages: null,
        ...nextState,
      };
    } else {
      nextState = {
        totalBlocks: Collections.appList,
        currentBlocks: [],
        currentPage: null,
        totalPages: null,
        ...nextState,
      };
    }
    this.setState(nextState);
  };

  render() {
    const {
      totalBlocks,
      currentBlocks,
      currentPage,
      totalPages,
      searchText,
      shouldReset,
    } = this.state;
    const totalBlockNumber = totalBlocks.length;

    return (
      <div className="App">
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search collections..."
            value={searchText}
            onChange={this.onSearchTextChange}
          />
        </div>
        <h1 className="page-title">App Store App Collections</h1>
        {totalBlockNumber > 0 && (
          <div>
            <ul className="list-container">
              {currentBlocks.map(collection => (
                <StoriesLink appList={collection} />
              ))}
            </ul>
            <Pagination
              totalRecords={totalBlockNumber}
              pageLimit={12}
              pageNeighbours={0}
              onPageChanged={this.onPageChanged}
              shouldReset={shouldReset}
            />
          </div>
        )}

        <footer>
          {currentPage && (
            <div className="footerInfo">
              Page <span>{currentPage}</span> of <span>{totalPages}</span>
              <div>{totalBlockNumber} App Collections</div>
            </div>
          )}
        </footer>
      </div>
    );
  }
}

const searchCollection = Collections.appList.map(collection => {
  const { apps } = collection;
  const tags = apps.map(app => {
    return app.title;
  });
  return {
    ...collection,
    tags,
  };
});

var search = new JsSearch.Search("title");
search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
search.addIndex("title");
search.addIndex("subtitle");
search.addIndex("tags");

search.addDocuments(searchCollection);

export default App;
