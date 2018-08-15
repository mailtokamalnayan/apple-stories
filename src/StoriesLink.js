import React from 'react'

function StoriesLink(props) {
    const listItems = props.titles.map((title) =>
      <li className="list-item">
        <h3 className="list-subtitle">{title.subtitle}</h3>
        <h2 className="list-title">{title.title}</h2>
          <ul>
            { title.apps.map(appName => 
              <li className="app-item">
                <picture className="app-image">
                  <source srcSet={appName.picture} media={'(min-width: 1069px)'} />
                  <img src={appName.avatar} />
                </picture>
                <div className="app-info">
                  <div className="app-title">{appName.title}</div>
                  <div className="app-category">{appName.category}</div>
                </div>
                <a className="app-link" href={appName.link}>VIEW</a>
              </li> 
            )} 
          </ul>
      </li>
    );
    return (
      <ul className="list-container">{listItems}</ul>
    );
}

export default StoriesLink