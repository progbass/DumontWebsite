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
class ProfileWindow extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {teamMember} = this.props;
    if(!teamMember) return <Redirect to={window.DumontSettings.path} />;

    // Render Component
    return (
      <div className="modalbox__container profile section--spacing ">
        <div className="profile__info">
          <div className="profile__head"> 
            <h2 className="name"
            dangerouslySetInnerHTML={{__html:teamMember.title.rendered}} />
            <h3 className="role"
            dangerouslySetInnerHTML={{__html:teamMember.acf.role}} />
            <span className="email"><a href={`mailto:${teamMember.acf.email}`}>{teamMember.acf.email}</a></span>
          </div>

          <div className="profile__meta">
            {teamMember.acf.cv !== "" && (
              <div className="icon print">
                <a href={teamMember.acf.cv} target="_blank">Imprimir</a>
              </div>
            )}
            
            {teamMember.acf.vcard && (
              <div className="icon card">
                <a href={teamMember.acf.vcard}>Info</a>
              </div>
            )}
            
            {teamMember.acf.linkedin !== "" && (
              <div className="icon linkedin">
                <a href={teamMember.acf.linkedin} target="_blank">Linkedin</a>
              </div>
            )}
          </div>
        </div>

        <div
          className="profile__content"
          dangerouslySetInnerHTML={{__html:teamMember.content.rendered}} />

        <div className="skills">
          {teamMember.acf.articles.length > 1 && (
            <div className="skills__module articles">
              <h4 className="subtitle">Published Articles:</h4>
              <ul className="list">
                {teamMember.acf.articles.map( (article, index) => (
                  <li className="article list__item" key={`language-${index}`} >
                    <a href={article.article} target="_blank" dangerouslySetInnerHTML={{__html:article.article_title}} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {teamMember.acf.languages.length > 1 && (
            <div className="skills__module languages">
              <h4 className="subtitle">Languages:</h4>
              <ul className="list">
                {teamMember.acf.languages.map( (language, index) => (
                  <li className="language list__item" key={`language-${index}`} dangerouslySetInnerHTML={{__html:language.language}} />
                ))}
              </ul>
            </div>
          )}

          {teamMember.acf.awards.length > 1 && (
          <div className="skills__module awards">
            <h4 className="subtitle">Awards:</h4>
            <ul className="list">
              {teamMember.acf.awards.map( (award, index) => (
                <li key={`award-${index}`} className="award list__item"><img src={award.award_icon.url} alt={award.award_name} className="image--responsive" /></li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </div>
    );
  }
}
export default ProfileWindow;
