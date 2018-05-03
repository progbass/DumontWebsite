import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

import config from '../config';
import Patents from './services/Patents';
import Trademarks from './services/Trademarks';
import Litigation from './services/Litigation';
import Copyright from './services/Copyright';
import Enforcement from './services/Enforcement';
import PersonalData from './services/PersonalData';

const scrollConfig = { offset: 0, align: 'top', duration: 1000 };
class ProfileWindow extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {teamMember} = this.props;
    //const path = this.props.location.pathname.split('/').pop() || '';

    if(!teamMember) return null;

    // Render Component
    return (
      <div className="modalbox__container profile">
        <div className="profile__info">
          <h2 className="name">{teamMember.title.rendered}</h2>
          <h3 className="role">{teamMember.acf.role}</h3>
          <span className="email">{teamMember.acf.email}</span>
        </div>

        <div
          className="profile__content"
          dangerouslySetInnerHTML={{__html:teamMember.content.rendered}} />

        <div className="skills">
          <div className="skills__module articles">
            <h4 className="subtitle">Published Articles:</h4>
            <ul>
              <li className="list-item">85-88 Americas Mexico Dumont 17</li>
              <li className="list-item">Tax implication for Foregein...</li>
              <li className="list-item">Trademarks and patents</li>
              <li className="list-item">Mexico moves forward</li>
            </ul>
          </div>

          <div className="skills__module languages">
            <h4 className="subtitle">Languages:</h4>
            <ul>
              <li className="list-item">English </li>
              <li className="list-item">Spanish </li>
            </ul>
          </div>

          <div className="skills__module awards">
            <h4 className="subtitle">Awards:</h4>
            <ul>
              <li>Women in Business Law 2017</li>
              <li>IPSTAR</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileWindow;
