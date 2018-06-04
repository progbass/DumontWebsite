import React, { Component } from 'react';
import axios from 'axios';

import config from '../config';

class AboutUs extends Component {
  constructor(props){
    super(props);
    this.state = {
      members: [],
      membersLoaded: false,
    }
    this.membersListInit = false;
    this.carouselColumns = 2;
    this.currentPage = 0;
    this.totalPages = 0;
    this.sliderInterval = 0;

    // Method Scope Binding
    this.getColumnNumbers = this.getColumnNumbers.bind(this);
    this.configSlider = this.configSlider.bind(this);
  }
  componentWillReceiveProps(nextProps){
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
  componentDidUpdate(){
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
    // Load Team Members
    axios.get(`${window.DumontSettings.URL.api_baseURL}/team-members/?per_page=100`)
    .then(response => {
      this.setState({
        members: response.data,//.reverse(),
        membersLoaded: true
      });
    })
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
    const { members } = this.state;

    // Render Component
    return (
      <section className="home main-banner section">
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
      </section>
    );
  }
}
export default AboutUs;
