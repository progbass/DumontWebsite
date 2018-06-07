import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import config from '../config';
import withAccordion from '../withAccordion';
import NewsWindow from './modalbox/NewsWindow';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      news: [],
      certifications: [],
      contentLoaded: false,
      newsLoaded: false,
      certificationsLoaded: false
    }
    this.openModalBox = this.openModalBox.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
  }
  openModalBox(post) {
    console.log(post)
    this.props.openModalBox(NewsWindow, { post: post });
  }
  closeModalBox(e) {
    e.preventDefault();
    this.props.closeModalBox()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.news !== this.state.news) {
      const slider = document.querySelector('.news-list');
      const slideItem = document.querySelector('.news-list .news').offsetWidth;
      slider.style.width = `${slider.children.length * slideItem}px`;
      console.log(slideItem, `${slider.children.length * slideItem}px`)
    }
  }
  componentDidMount() {
    // Load Content
    axios.get(`${window.DumontSettings.URL.api_baseURL}/pages/102/`)
      .then(response => {
        this.setState({
          content: response.data,
          contentLoaded: true
        })
      });

    // Load News
    axios.get(`${window.DumontSettings.URL.api_baseURL}/news-section?per_page=100`)
      .then(response => {
        this.setState({
          news: response.data,
          newsLoaded: true
        })
      })

    // Load Awards
    axios.get(`${window.DumontSettings.URL.api_baseURL}/awards?per_page=100`)
      .then(response => {
        this.setState({
          awards: response.data,
          awardsLoaded: true
        })
      })

    // Load Awards
    axios.get(`${window.DumontSettings.URL.api_baseURL}/certifications?per_page=100`)
      .then(response => {
        this.setState({
          certifications: response.data,
          certificationsLoaded: true
        })
      })

    // Load Articles
    axios.get(`${window.DumontSettings.URL.api_baseURL}/articles?per_page=100`)
      .then(response => {
        this.setState({
          articles: response.data,
          articlesLoaded: true
        })
      })

    // Load Associations
    axios.get(`${window.DumontSettings.URL.api_baseURL}/associations?per_page=100`)
      .then(response => {
        this.setState({
          associations: response.data,
          associationsLoaded: true
        })
      })
  }
  render() {
    const { isOpen } = this.props;
    const {
      content: newsContent = {},
      news: newsList = [],
      articles: articlesList = [],
      associations: associationsList = [],
      awards: awardsList = [],
      certifications: certificationsList = []
    } = this.state;

    const appPath = window.DumontSettings.URL.domain;
    var absoluteURIPath = appPath.replace (/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1'); // http or https

    // Render Component
    return (
      <section className="section news ">
        <div className={`section--spacing accordion-trigger ${isOpen ? 'accordion-trigger--open' : ''}`} >
          <h2 className="title-main">News</h2>
        </div>

        <div className={`accordion-collapsable ${isOpen ? 'accordion-collapsable--open' : ''}`}>
          <div className=" section--spacing heroe-banner">
            <div className="section__module background-container">
              <div className={`heroe-banner__title`} >
                <h2 className="title-main">News</h2>
              </div>
              {'content' in newsContent && (
                <div
                  className={`heroe-banner__content`}
                  dangerouslySetInnerHTML={{ __html: newsContent.content.rendered }}
                />
              )}
            </div>
          </div>

          {newsList.length > 0 && (
            <div className="section__module news-container section--spacing">
              <div
                className="news-list">
                {newsList.map(news => (
                  <div className={`news`} key={news.id} >
                    <div className="news__cover">
                      <Link
                        className="cover-link"
                        to={`/${absoluteURIPath}read/${news.slug}/`}
                        onClick={e => {
                          //e.preventDefault();
                          //this.openModalBox(news);
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
                      <h3 className="name" dangerouslySetInnerHTML={{__html:news.title.rendered}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="container--half section__module  section--spacing">
            {awardsList.length > 0 && (
              <div className="awards ">
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

            {certificationsList.length > 0 && (
              <div className="certifications">
                <h2 className="title-main">Certifications</h2>
                <ul className="certifications__list ">
                  {certificationsList.map(certification => (
                    <li className={`certification`} key={certification.id} >
                      <a
                        className="certification-link"
                        href={`${certification.certification_link}`}
                        target="_blank"
                      >
                        {certification.acf.certification_logo && (
                          <img
                            src={certification.acf.certification_logo}
                            className="certification-image image--responsive"
                            alt={certification.title.rendered} />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>


          {articlesList.length > 0 && (
            <div className="section__module articles section--spacing">
              <h2 className="title-main">Articles</h2>
              <ul className="articles__list">
                {articlesList.map(article => (
                  <li className="article list__item" key={`article-${article.id}`} >
                    <a href={article.acf.file} target="_blank" dangerouslySetInnerHTML={{__html:article.title.rendered}} />
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
        </div>
      </section>
    );
  }
}
export default withAccordion(News);
