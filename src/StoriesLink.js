import React, { Component, Fragment } from "react";
import LazyLoad from 'react-lazyload';
import PropTypes from "prop-types";

class StoriesLink extends Component {
  render() {
    const { subtitle = null, title = null, storyLinks = null, heroimage = null, apps = {} } =
      this.props.appList || {};
    return (
      <Fragment>
        {apps.length > 0 && 
          <li className="list-item">
            <div className="app-item-wraper">
              <a href={storyLinks} className="iconLink" target="_blank">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 16H3C2.45 16 2 15.55 2 15V3C2 2.45 2.45 2 3 2H8C8.55 2 9 1.55 9 1C9 0.45 8.55 0 8 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V10C18 9.45 17.55 9 17 9C16.45 9 16 9.45 16 10V15C16 15.55 15.55 16 15 16ZM11 1C11 1.55 11.45 2 12 2H14.59L5.46 11.13C5.07 11.52 5.07 12.15 5.46 12.54C5.85 12.93 6.48 12.93 6.87 12.54L16 3.41V6C16 6.55 16.45 7 17 7C17.55 7 18 6.55 18 6V1C18 0.45 17.55 0 17 0H12C11.45 0 11 0.45 11 1Z" fill="#999"/>
              </svg>
              </a>
              <h3 className="list-subtitle">{subtitle}</h3>
              <h2 className="list-title">{title}</h2>
              {heroimage && 
              <LazyLoad height={388} throttle={200} offset={200}>
                <div className="list-image" style={{backgroundImage: "url(" + heroimage + ")"}}>
                </div>
              </LazyLoad>}
            <ul>
                { apps.map(appName => 
                  <li className="app-item">
                      <picture className="app-image">
                        <LazyLoad height={48} offset={100}>
                          <source srcSet={appName.picture} media={'(min-width: 1069px)'} />
                          <img src={appName.avatar} />
                        </LazyLoad>
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
      </Fragment>
    );
  }
}

StoriesLink.propTypes = {
  appList: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
  }).isRequired
};

export default StoriesLink