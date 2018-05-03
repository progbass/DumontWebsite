import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import scrollToComponent from 'react-scroll-to-component';
import axios from 'axios';

import config from '../config';
import withAccordion from '../withAccordion';
import ServicesWindow from './modalbox/ServicesWindow'

const scrollConfig = { offset: 0, align: 'top', duration: 1000 };
class Services extends Component {
  constructor(props){
    super(props);
    this.state = {
      services: [],
      contentLoaded: false
    }
    this.container_ref = React.createRef();
    this.closeWindow = this.closeWindow.bind(this);
  }
  closeWindow(){
    this.props.history.push("/services");
    scrollToComponent(this.container_ref, {...scrollConfig, offset: -800});
  }
  openModalBox(service){
    this.props.openModalBox(<ServicesWindow service={service} />);
    //scrollToComponent(this.container_ref, scrollConfig)
  }
  componentDidMount(){
    // Load Services List
    axios.get(`${config.api_baseURL}/services/`)
    .then(response => {
      this.setState({
        services: response.data,
        contentLoaded: true
      })
    });
  }
  render() {
    const { services, contentLoaded } = this.state;
    const {isOpen} = this.props;
    const path = this.props.location.pathname.split('/').pop() || '';

    if(!contentLoaded) return null;

    // Render Component
    return (
      <section className="section our-services">
        <nav className="our-services__navigation">
          <ul className="our-services__menu">
            {services.map( service => (
              <li className={`section ${service.slug}`}  key={service.id}>
                <Link 
                    to={`/services/${service.slug}`} 
                    className="section__link" 
                    onClick={(e) => {
                      e.preventDefault();
                      this.openModalBox(service)
                    }}
                  >
                  <h3 className="section__title">{service.title.rendered}</h3>
                </Link>
              </li>
              ))}
            </ul>
        </nav>
      </section>
    );
  }
}
export default withRouter(Services);
