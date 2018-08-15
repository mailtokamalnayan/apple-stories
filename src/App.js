import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StoriesLink from './StoriesLink';

const scrapeIt = require("scrape-it")

const links = ['https://itunes.apple.com/in/story/id1286988230',
                  'https://itunes.apple.com/in/story/id1278619470', 
                  'https://itunes.apple.com/in/story/id1353737320', 
                  'https://itunes.apple.com/in/story/id1296536229', 
                  'https://itunes.apple.com/in/story/id1337185897'];

function getTitles() {
  const titles = links.map(function(links) {
    return scrapeIt(links, {
      title: ".story-header__headline",
      subtitle: ".story-header__subhead"
    , apps: {
        listItem: ".we-product-collection__item",
        data: {
          title: ".we-product-collection__item__product-name",
          category: ".we-product-collection__item__category a",
          avatar: {
            selector: ".we-artwork__image",
            attr: "src"
          },
          link: {
            selector: ".we-product-collection__item__button",
            attr: "href"
          },
          picture: {
            selector: ".we-artwork--ios-app-icon source",
            attr: "srcset"
          }
        }
    }
    }).then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`)
        console.log(data)
        return data
    });
  })

  return titles
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {titles: [] } ;
  }

  componentWillMount() {
    let titles = getTitles()
    Promise.all(titles).then((values) => {
      console.log("Setting state")
      console.log(titles)
      console.log(values)
      this.setState({titles: values})
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="page-title">Apple App Collections</h1>
        <StoriesLink titles={this.state.titles} links={links}/>
      </div>
    );
  }
}

export default App;
