import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

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

    const appPath = window.DumontSettings.URL.domain;
    var absoluteURIPath = appPath.replace (/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1'); // http or https

    // Render Component
    return (
      <div onClick={this.props.closeModalBox} className="our-services-modalbox" >
        <div className={`section__overlay  ${service.slug}`}></div>
        <ul className="our-services-list" ref={(section) => { this.container_ref = section; }}>
          <Route path={`/${absoluteURIPath}services/patents`} component={()=><Patents service={service} onClick={this.closeWindow} />} />
          <Route path={`/${absoluteURIPath}services/trademarks`} component={()=><Trademarks service={service} onClick={this.closeWindow} />} />
          <Route path={`/${absoluteURIPath}services/litigation`} component={()=><Litigation service={service} onClick={this.closeWindow} />} />
          <Route path={`/${absoluteURIPath}services/copyright`} component={()=><Copyright service={service} onClick={this.closeWindow} />} />
          <Route path={`/${absoluteURIPath}services/corporate-commercial-law`} component={()=><Enforcement service={service} onClick={this.closeWindow} />} />
          <Route path={`/${absoluteURIPath}services/privacy-law`} component={()=><PersonalData service={service} onClick={this.closeWindow} />} />
        </ul>
      </div>
    );
  }
}
export default ServicesWindow;
