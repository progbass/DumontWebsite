import React, { Component } from 'react';
import axios from 'axios';

import withAccordion from '../withAccordion';
import config from '../config';

class Resources extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: {},
      contentLoaded: false,
    }
  }
  componentDidMount(){
    // Load Content
    axios.get(`${window.DumontSettings.URL.api_baseURL}/pages/44/`)
    .then(response => {
      this.setState({
        content: response.data,
        contentLoaded: true
      })
    });
  }
  render() {
    const {isOpen} = this.props;
    const { content:resources={}, members} = this.state;
    if(!resources.hasOwnProperty('content')) return null;

    // Render Component
    return (
      <section
        style={{backgroundImage: `url(${resources.acf.background})`}}
        className="section section--spacing resources desktop-min-height">
        <div className="section__module">
          
          <div className="resources__content">
            {resources.acf && (
              <div>
                <div dangerouslySetInnerHTML={{__html:resources.content.rendered}} />

                <ul className="resources__list">
                  {resources.acf.resources.map( (resource, index) => (
                    <li className="resources__item" key={index}>
                      <span className="name"><a target="_blank" href={resource.document.url}>{resource.name}</a></span>
                      {/*<p>{resource.description}</p>*/}
                      <span className="pdf-icon"></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="resources__title">
            <h2 className="title-main">Resources</h2>
          </div>
        </div>
      </section>
    );
  }
}
export default Resources;
