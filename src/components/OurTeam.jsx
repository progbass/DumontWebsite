import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import config from '../config';
import withAccordion from '../withAccordion';
import ProfileWindow from './modalbox/ProfileWindow';

class OurTeam extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      members: [],
      contentLoaded: false,
      membersLoaded: false
    }
    this.openModalBox = this.openModalBox.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
  }
  openModalBox(member){
    this.props.openModalBox(ProfileWindow, {teamMember:member} );
  }
  closeModalBox(e){
    e.preventDefault();
    this.props.closeModalBox()
  }
  componentDidMount(){
    // Load Content
    axios.get(`${window.DumontSettings.URL.api_baseURL}/pages/`)
    .then(response => {
      this.setState({
        posts: response.data,
        contentLoaded: true
      })
    });

    // Load Team Members
    axios.get(`${window.DumontSettings.URL.api_baseURL}/team-members?per_page=100`)
    .then(response => {
      this.setState({
        members: response.data,
        membersLoaded: true
      })
    })
  }
  render() {
    const {isOpen} = this.props;
    const { posts, members} = this.state;

    // Parse Posts
    const ourTeam = posts.find(post => post.slug === 'our-team') || {};
    
    // Render Component
    return (
      <section className="section our-team">
        <div className={`section--spacing accordion-trigger ${ isOpen ? 'accordion-trigger--open' : ''}`} >
          <h2 className="title-main">Our Team</h2>
        </div>

        <div className={`accordion-collapsable ${ isOpen ? 'accordion-collapsable--open' : ''}`}>
          {'content' in ourTeam > 0 && (
            <div
              style={{backgroundImage: `url(${ourTeam.acf.background.url})`}}
              className="section--spacing heroe-banner">
              <div className="section__module background-container">
                <div className={`heroe-banner__title`} >
                  <h2 className="title-main">Our Team</h2>
                </div>
                {'content' in ourTeam && (
                  <div 
                    className={`heroe-banner__content`}
                    dangerouslySetInnerHTML={{__html:ourTeam.content.rendered}}
                  />
                )}
              </div>
            </div>
          )}

          {members.length > 0 && (
            <div className="section__module team">
              <ul className="team__list section--spacing">
                {members.map(member => (
                  <li className={`member ${member.acf.profile_color === 'cyan' ? 'member--cyan' : ''}`} key={member.id} >
                    <div className="member__cover">
                      <Link 
                        className="cover-link" 
                        to={`our-team/${member.slug}/`}  
                        onClick={e => {
                          this.openModalBox(member);
                          return false;
                        }
                      }>
                        {member.better_featured_image.media_details.sizes.medium && (
                          <img 
                            src={member.better_featured_image.source_url} 
                            className="cover-image image--responsive" 
                            alt={member.title.rendered} />
                        )}
                      </Link>
                    </div>
                    <div className="member__info member__info">
                      <h3 className="name" dangerouslySetInnerHTML={{__html:member.title.rendered}} />
                      <span className="role" dangerouslySetInnerHTML={{__html:member.acf.role}} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    );
  }
}
export default withAccordion(OurTeam);
