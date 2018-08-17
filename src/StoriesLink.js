import React from 'react'
import data from './scraped.json'

function StoriesLink(props) {
    const listItems = data.appList.map((title) =>
      <div>
        {title.apps.length > 0 && 
        <li className="list-item">
          <div className="app-item-wraper">
            <h3 className="list-subtitle">{title.subtitle}</h3>
              <h2 className="list-title">{title.title}</h2>
              {title.heroimage && 
                <div className="list-image"><img src={title.heroimage} /></div>
              }
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
                      <a className="app-link" target={"_blank"} href={appName.link}>VIEW</a>
                  </li> 
                )} 
              </ul>
            </div>
          </li>
        }
      </div>
    );
    return (
      <ul className="list-container">{listItems}</ul>
    );
}

export default StoriesLink