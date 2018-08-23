import React, { Component, Fragment } from "react";
import LazyLoad from 'react-lazyload';
import PropTypes from "prop-types";

class StoriesLink extends Component {
  render() {
    const { subtitle = null, title = null, heroimage = null, apps = {} } =
      this.props.appList || {};
    return (
      <Fragment>
        {apps.length > 0 && 
          <li className="list-item">
            <div className="app-item-wraper">
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