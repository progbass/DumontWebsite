import React, { Component } from 'react';
import axios from 'axios';

import config from '../config';
import withAccordion from '../withAccordion';

class AboutUs extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      contentLoaded: false
    }
  }
  componentDidMount(){
    // Load Content
    axios.get(`${window.DumontSettings.URL.api_baseURL}/pages/`)
    .then(response => {
      this.setState({
        posts: response.data,
        contentLoaded: true
      })
    });
  }
  render() {
    const {isOpen} = this.props;
    const { posts } = this.state;

    // Parse Posts
    const biography = posts.find(post => post.slug === 'biography') || {};
    const aboutUs = posts.find(post => post.slug === 'about-us') || {};

    // Render Component
    return (
      <section className="about-us section">
        <div className={`section--spacing accordion-trigger ${ isOpen ? 'accordion-trigger--open' : ''}`} >
          <h2 className="title-main">About Us</h2>
        </div>

        <div className={`accordion-collapsable ${ isOpen ? 'accordion-collapsable--open' : ''}`}>
          {'content' in aboutUs && (
            <div className={`section__module section--spacing information desktop-min-height`}>
              <div className={`information__title`}>
                <h2 
                  className="title-main" 
                  dangerouslySetInnerHTML={{__html:aboutUs.title.rendered}}
                />
              </div>
              <div 
                className="information__content" 
                dangerouslySetInnerHTML={{__html:aboutUs.content.rendered}}
              />
              <div className="information__flag">
                <img className="image--responsive" src={`${window.DumontSettings.URL.theme_url}/build/static/media/aboutus-flag.jpg`} alt="Bandera Mexicana" />
              </div>
            </div>
          )}

          {'content' in biography && (
            <div
              style={{backgroundImage: `url(${biography.acf.background.url})`}}
              className="section--dark section--spacing biography desktop-min-height">
              <div className="section__module ">
                <div 
                  className={`biography__content`} 
                  dangerouslySetInnerHTML={{__html:biography.content.rendered}}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
AboutUs = withAccordion(AboutUs);
export default AboutUs;
