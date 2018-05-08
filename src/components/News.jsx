import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import config from '../config';
import withAccordion from '../withAccordion';
import ProfileWindow from './modalbox/ProfileWindow';

class News extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      news: [],
      contentLoaded: false,
      newsLoaded: false
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
    axios.get(`${config.api_baseURL}/pages/102/`)
    .then(response => {
      this.setState({
        content: response.data,
        contentLoaded: true
      })
    });

    // Load News
    axios.get(`${config.api_baseURL}/news-section?per_page=100`)
    .then(response => {
      this.setState({
        news: response.data,
        newsLoaded: true
      })
    })

    // Load Awards
    axios.get(`${config.api_baseURL}/awards?per_page=100`)
    .then(response => {
      this.setState({
        awards: response.data,
        awardsLoaded: true
      })
    })

    // Load Articles
    axios.get(`${config.api_baseURL}/articles?per_page=100`)
    .then(response => {
      this.setState({
        articles: response.data,
        articlesLoaded: true
      })
    })

    // Load Associations
    axios.get(`${config.api_baseURL}/associations?per_page=100`)
    .then(response => {
      this.setState({
        associations: response.data,
        associationsLoaded: true
      })
    })
  }
  render() {
    const {isOpen} = this.props;
    const { 
      content:newsContent, 
      news:newsList=[], 
      articles:articlesList=[], 
      associations:associationsList=[],
      awards:awardsList=[]
    } = this.state;

    // Parse Content
    if(!newsContent) return null;

    // Render Component
    return (
      <section className="section news">
          <div className=" section--spacing heroe-banner">
            <div className="section__module background-container">
              <div className={`heroe-banner__title accordion-trigger ${ isOpen ? 'accordion-trigger--open' : ''}`} >
                <h2 className="title-main">News</h2>
              </div>
              {'content' in newsContent && (
                <div 
                  className={`
                    heroe-banner__content 
                    accordion-collapsable 
                    ${ isOpen ? 'accordion-collapsable--open' : ''}
                  `}
                  dangerouslySetInnerHTML={{__html:newsContent.content.rendered}}
                />
              )}
            </div>
          </div>

          {newsList.length > 0 && (
            <div className="section__module news-container section--spacing">
              <Carousel
                centerMode
                showIndicators={false}
                showStatus={false}
                showThumbs={false}
                emulateTouch
                className="news-list">
                {newsList.map(news => (
                  <div className={`news`} key={news.id} >
                    <div className="news__cover">
                      <Link 
                        className="cover-link" 
                        to={`/our-team/${news.slug}/`}  
                        onClick={e => {
                          this.openModalBox(news);
                          return false;
                        }
                      }>
                        {news.better_featured_image.media_details.sizes.medium && (
                          <img 
                            src={news.better_featured_image.source_url} 
                            className="cover-image image--responsive" 
                            alt={news.title.rendered} />
                        )}
                      </Link>
                    </div>
                    <div className="news__info news__info">
                      <h3 className="name">{news.title.rendered}</h3>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}


          {awardsList.length > 0 && (
            <div className="section__module awards section--spacing">
              <h2 className="title-main">Awards</h2>
              <ul className="awards__list ">
                {awardsList.map(award => (
                  <li className={`award`} key={award.id} >
                    <a 
                      className="award-link" 
                      href={`${award.link}`}  
                      target="_blank"
                    >
                      {award.acf.logo && (
                        <img 
                          src={award.acf.logo} 
                          className="award-image image--responsive" 
                          alt={award.title.rendered} />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}


          {articlesList.length > 0 && (
            <div className="section__module articles section--spacing">
              <h2 className="title-main">Articles</h2>
              <ul className="articles__list">
                {articlesList.map(article => (
                  <li className="article list__item" key={`article-${article.id}`} >
                    <a href={article.acf.file} target="_blank" >{article.title.rendered}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}


          {associationsList.length > 0 && (
            <div className="section__module associations section--spacing">
              <h2 className="title-main">Associations</h2>
              <ul className="associations__list ">
                {associationsList.map(association => (
                  <li className={`association`} key={association.id} >
                    <a 
                      className="association-link" 
                      href={`${association.link}`}  
                      target="_blank"
                    >
                      {association.acf.logo && (
                        <img 
                          src={association.acf.logo} 
                          className="association-image image--responsive" 
                          alt={association.title.rendered} />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
    );
  }
}
export default withAccordion(News);
