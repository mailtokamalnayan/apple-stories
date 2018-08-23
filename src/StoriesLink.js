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
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.34521 5.256C2.68121 3.492 4.33721 2.28 6.13721 2.28H9.65321C10.2772 2.28 10.7932 1.764 10.7932 1.14C10.7932 0.516 10.2772 0 9.65321 0H6.25721C3.12521 0 0.329206 2.292 0.0292056 5.412C-0.318794 8.988 2.48921 12 5.99321 12H9.65321C10.2772 12 10.7932 11.484 10.7932 10.86C10.7932 10.236 10.2772 9.72 9.65321 9.72H5.99321C3.70121 9.72 1.88921 7.632 2.34521 5.256ZM8.39321 7.2H15.5932C16.2532 7.2 16.7932 6.66 16.7932 6C16.7932 5.34 16.2532 4.8 15.5932 4.8H8.39321C7.73321 4.8 7.19321 5.34 7.19321 6C7.19321 6.66 7.73321 7.2 8.39321 7.2ZM17.7292 0H14.3332C13.7092 0 13.1932 0.516 13.1932 1.14C13.1932 1.764 13.7092 2.28 14.3332 2.28H17.8492C19.6492 2.28 21.3052 3.492 21.6412 5.256C22.0972 7.632 20.2852 9.72 17.9932 9.72H14.3332C13.7092 9.72 13.1932 10.236 13.1932 10.86C13.1932 11.484 13.7092 12 14.3332 12H17.9932C21.4972 12 24.3052 8.988 23.9692 5.412C23.6692 2.292 20.8612 0 17.7292 0Z" fill="#007AFF"/>
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