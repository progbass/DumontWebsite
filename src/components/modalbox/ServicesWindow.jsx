import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

import config from '../../config';
import Patents from '../services/Patents';
import Trademarks from '../services/Trademarks';
import Litigation from '../services/Litigation';
import Copyright from '../services/Copyright';
import Enforcement from '../services/Enforcement';
import PersonalData from '../services/PersonalData';

const scrollConfig = { offset: 0, align: 'top', duration: 1000 };
class ServicesWindow extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {service} = this.props;

    if(!service) return null;

    // Render Component
    return (
      <div onClick={this.props.closeModalBox} className={`our-services-modalbox ${service.slug}`}>
        <ul className="section__module our-services-list" ref={(section) => { this.container_ref = section; }}>
          <Route path="/services/patents" component={()=><Patents onClick={this.closeWindow} />} />
          <Route path="/services/trademarks" component={()=><Trademarks onClick={this.closeWindow} />} />
          <Route path="/services/litigation" component={()=><Litigation onClick={this.closeWindow} />} />
          <Route path="/services/copyright" component={()=><Copyright onClick={this.closeWindow} />} />
          <Route path="/services/enforcement" component={()=><Enforcement onClick={this.closeWindow} />} />
          <Route path="/services/personal-data-protection" component={()=><PersonalData onClick={this.closeWindow} />} />
        </ul>
      </div>
    );
  }
}
export default ServicesWindow;
