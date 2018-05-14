import React, { Component } from 'react';
import {withRouter} from 'react-router';
import scrollToComponent from 'react-scroll-to-component';

const scrollConfig = { offset: -80, align: 'top', duration: 1000 };
class Scroller extends React.Component {
  componentWillReceiveProps(nextProps){
    if(this.props.location !== nextProps.location){
      const target = nextProps.location.pathname.split('/').pop();
      if(
        target === 'home'
        || target === 'about-us'
        || target === 'our-team'
        || target === 'our-services'
        || target === 'news'
        || target === 'resources'
        || target === 'contact'){
        scrollToComponent(document.querySelector('.section.'+target), scrollConfig);
      }
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
export default withRouter(Scroller);