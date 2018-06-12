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
    this.state = {
      service: null
    }
    this.renderComponent = this.renderComponent.bind(this);
  }
  componentDidMount(){
    // const appPath = window.DumontSettings.URL.domain;
    // var absoluteURIPath = appPath.replace (/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1'); // http or https

    // // Load Content
    // axios.get(`${window.DumontSettings.URL.api_baseURL}/services?slug=${this.props.match.params.service}/`)
    // .then(response => {
    //   if(!response.data) this.props.history.push(`${absoluteURIPath}`)
    //   this.setState({
    //     service: response.data[0]
    //   })
    // });
  }
  renderComponent(service){
    return (
      <div className="service__content">
        <div className="header">
          <h4 className="subtitle">What we do</h4>
          <h3 className="title-main"
            dangerouslySetInnerHTML={{__html:service.title.rendered}} />
        </div>
        <div className="detail"
          dangerouslySetInnerHTML={{__html:service.content.rendered}} />
      </div>
    )
  }
  render() {
    console.log('props inside ', this.props)

    const appPath = window.DumontSettings.path;
    var absoluteURIPath = appPath;//appPath.replace (/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1'); // http or https

    const {service} = this.props;
    if(!service) return <Redirect to={absoluteURIPath} />;

    // Render Component
    return (
      <div className="our-services-modalbox" >
        <div className={`section__overlay  ${service.slug}`}></div>
        <ul className="our-services-list" ref={(section) => { this.container_ref = section; }}>
          <Route path={`${absoluteURIPath}services/patents`} component={()=>{
            return (
              <li className="service patents">{this.renderComponent(service)}</li>
            )
          }} />
          <Route path={`${absoluteURIPath}services/trademarks`} component={()=>{
            return (
              <li className="service trademarks">{this.renderComponent(service)}</li>
            )
          }} />
          <Route path={`${absoluteURIPath}services/litigation`} component={()=>{
            return (
              <li className="service litigation">{this.renderComponent(service)}</li>
            )
          }} />
          <Route path={`${absoluteURIPath}services/copyright`} component={()=>{
            return (
              <li className="service copyright">{this.renderComponent(service)}</li>
            )
          }} />
          <Route path={`${absoluteURIPath}services/corporate-commercial-law`} component={()=>{
            return (
              <li className="service corporate-commercial-law">{this.renderComponent(service)}</li>
            )
          }} />
          <Route path={`${absoluteURIPath}services/privacy-law`} component={()=>{
            return (
              <li className="service personal-data">{this.renderComponent(service)}</li>
            )
          }} />
        </ul>
      </div>
    );
  }
}
export default withRouter(ServicesWindow);
