import React, { Component } from 'react';
import axios from 'axios';

import config from '../config';
import withAccordion from '../withAccordion';

class AboutUs extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDescriptionOpen: false,
      posts: [],
      contentLoaded: false
    }
    this.toggleInformationModule = this.toggleInformationModule.bind(this);
    this.removeListeners = this.removeListeners.bind(this);
    this.addListeners = this.addListeners.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.mobileMode !== nextProps.mobileMode){
      this.removeListeners();
      if(this.props.mobileMode){
        this.addListeners();
        this.toggleInformationModule(false)
      } else {
        this.toggleInformationModule(true)
      }
    }
  }
  componentWillUnmount(){
    this.removeListeners();
  }
  componentDidUpdate(){
    // If we´re on mobile mode, add listeners for mobile UX.
    if(this.state.contentLoaded && this.props.mobileMode){
      this.addListeners();
    }
  }
  componentDidMount(){
    // Load Content
    axios.get(`${config.api_baseURL}/pages/`)
    .then(response => {
      this.setState({
        posts: response.data,
        contentLoaded: true
      })
    })
  }
  addListeners(){
    document.querySelector('.information').addEventListener('click', this.toggleInformationModule);
  }
  removeListeners(){
    document.querySelector('.information').removeEventListener('click', this.toggleInformationModule);
  }
  toggleInformationModule(flag){
    const parsedFlag = typeof(flag) === 'object' ? null : flag;
    this.setState({
      isDescriptionOpen: parsedFlag !== null
        ? parsedFlag
        : !this.state.isDescriptionOpen
    })
  }
  render() {
    const {isOpen} = this.props;
    const {isDescriptionOpen, posts} = this.state;

    // Parse Posts
    const biography = posts.find(post => post.slug === 'biography') || {};
    const aboutUs = posts.find(post => post.slug === 'about-us') || {};

    // Render Component
    return (
      <section className="about-us section">
          <div className="section--dark section--spacing heroe-banner">
            <div >
              <h2 className="title">Your Ideas.<br/>Our Business.</h2>
            </div>
          </div>

          {'content' in biography && (
            <div className={`section__module section--spacing information ${!isDescriptionOpen ? 'information--closed' : ''}`}>
              <div 
                className="information__content" 
                dangerouslySetInnerHTML={{__html:biography.content.rendered}}
              />
              <div className="information__flag">
                <img className="image--responsive" src={require('../img/aboutus-flag.jpg')} alt="Bandera Mexicana" />
              </div>
            </div>
          )}

          {'content' in aboutUs && (
            <div className="section--dark section--spacing biography">
              <div className="section__module ">
                <div className={`biography__title accordion-trigger ${ isOpen ? 'accordion-trigger--open' : ''}`} >
                  <h2 
                    className="title-main" 
                    dangerouslySetInnerHTML={{__html:aboutUs.title.rendered}}
                  />
                </div>
                <div 
                  className={`
                    biography__content 
                    accordion-collapsable 
                    ${ isOpen ? 'accordion-collapsable--open' : ''}
                  `} 
                  dangerouslySetInnerHTML={{__html:aboutUs.content.rendered}}
                />
              </div>
            </div>
          )}
        </section>
    );
  }
}
AboutUs = withAccordion(AboutUs);
export default AboutUs;
