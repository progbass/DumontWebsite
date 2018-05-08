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
      members: [],
      membersLoaded: false,
      contentLoaded: false
    }
    this.membersListInit = false;
    this.init = false;
    this.carouselColumns = 2;
    this.currentPage = 0;
    this.totalPages = 0;
    this.sliderInterval = 0;

    // Method Scope Binding
    this.getColumnNumbers = this.getColumnNumbers.bind(this);
    this.configSlider = this.configSlider.bind(this);
    this.toggleInformationModule = this.toggleInformationModule.bind(this);
    this.removeListeners = this.removeListeners.bind(this);
    this.addListeners = this.addListeners.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(this.contentLoaded && this.props.mobileMode !== nextProps.mobileMode){
      this.removeListeners();
      if(nextProps.mobileMode){
        this.addListeners();
        this.toggleInformationModule(false)
      } else {
        this.toggleInformationModule(true)
      }
    }

    // Check breakpoint change to update layout
    if(this.props.breakpoint !== nextProps.breakpoint){
      this.configSlider(nextProps.breakpoint);
    }
  }
  getColumnNumbers(breakpoint){
    switch(breakpoint){
      case 'TABLET_L':
      case 'DESKTOP_M':
      case 'DESKTOP_L':
      case 'DESKTOP_XL':
        return 4;
        break;
      case 'TABLET_M':
        return 3;
        break;
      case 'MOBILE_M':
      default:
        return 2;
        break;
    }
    return 
  }
  componentWillUnmount(){
    this.removeListeners();
  }
  componentDidUpdate(){
    // If we´re on mobile mode, add listeners for mobile UX.
    if(this.state.contentLoaded && this.props.mobileMode){
      this.addListeners();
    }

    //
    if(this.state.membersLoaded){
      this.membersListInit = true;
      this.configSlider(this.props.breakpoint);
    }
  }
  configSlider(breakpoint){
    const membersList = document.querySelector('.members-list');
    //if(!this.membersListInit) return false;
    try{
      const members = membersList.querySelectorAll('.member');
      //
      this.membersListCache = members;
      this.carouselColumns = this.getColumnNumbers(breakpoint);
      this.totalPages = Math.round(members.length/this.carouselColumns);

      //
      Array.prototype.forEach.call( members, function( node ) {
        //node.parentNode.removeChild( node );
      });
      Array.prototype.forEach.call( members, (node, index) => {
        node.style.left = `${(100/this.carouselColumns) * Math.round(index%this.carouselColumns)}%`;
        node.style.width = `${(100/this.carouselColumns)}%`;
      });

      // Initialize Carousel
      clearInterval(this.sliderInterval);
      this.gotoSlide(0)
    } catch (e) {}
  }
  gotoSlide(slide){
    const members = this.membersListCache;

    // Reset / Reposition photos
    Array.prototype.forEach.call( members, (node, index) => {
      node.classList.toggle('active', false);
      node.style.zIndex = (this.totalPages) - (Math.floor(index/this.carouselColumns));
    });

    // Animate target member photos
    for(let i=0; i<this.carouselColumns; i++){
      const element = members.item( (this.carouselColumns * this.currentPage) + i );
      if(element){
        setTimeout(() => {
          element.classList.toggle('active', true)
          element.style.zIndex = (this.totalPages);
        }, 200*i)
      }
    }

    // Change Page
    this.currentPage++;
    if(this.currentPage > this.totalPages-1){
      this.currentPage = 0;
    }

    // Go to Next Page
    this.sliderInterval = setTimeout(this.gotoSlide.bind(this), 4000)
  }
  componentDidMount(){
    this.init = true;

    // Load Content
    axios.get(`${config.api_baseURL}/pages/`)
    .then(response => {
      this.setState({
        posts: response.data,
        contentLoaded: true
      })
    });

    // Load Team Members
    axios.get(`${config.api_baseURL}/team-members/?per_page=100`)
    .then(response => {
      this.setState({
        members: response.data,//.reverse(),
        membersLoaded: true
      });
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
    const { isDescriptionOpen, posts, members } = this.state;

    // Parse Posts
    const biography = posts.find(post => post.slug === 'biography') || {};
    const aboutUs = posts.find(post => post.slug === 'about-us') || {};

    // Render Component
    return (
      <section className="about-us section">
        <div className="section--dark section--spacing heroe-banner">
          {members.length > 0 && (
            <ul className="members-list">
              {members.map(member => (
                <li 
                  className="member" 
                  key={member.id}
                  style={{
                    backgroundImage: `url(${member.better_featured_image.source_url})`
                  }} />
              ))}
            </ul>
          )}
          <h2 className="title">Your Ideas.<br/>Our Business.</h2>
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
