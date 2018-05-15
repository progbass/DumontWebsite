import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import config from '../config';
import NewsWindow from './modalbox/NewsWindow';
import LegalWindow from './modalbox/LegalWindow';

const scrollConfig = { offset: 0, align: 'top', duration: 1000 };
class Footer extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      postsLoaded: false,
      legals: null,
      legalsLoaded: false,
      fixed: false,
    }
    this.newsInterval = 0;
    this.currentSlide = 0;
    this.gotoSlide = this.gotoSlide.bind(this);
    this.onResize = this.onResize.bind(this);
  }
  componentWillReceiveProps(nextProps){
    // Check breakpoint change to update layout
    if(this.props.mobileMode !== nextProps.mobileMode){
      this.setState({
        fixed: !nextProps.mobileMode
      })
    }
  }
  componentDidMount(){
    // Load Content
    axios.get(`${config.api_baseURL}/posts?posts_per_page=100`)
    .then(response => {
      this.setState({
        posts: response.data,
        postsLoaded: true
      })
    });

    // Load Legals
    axios.get(`${config.api_baseURL}/pages/195/`)
    .then(response => {
      this.setState({
        legals: response.data,
        legalsLoaded: true
      })
    });

    // Init news banner
    this.newsInterval = setInterval(()=>{
      this.currentSlide++;
      this.gotoSlide(this.currentSlide)
    }, 3000);
    this.gotoSlide(0);
  }
  componentDidUpdate(){
    // If we´re on mobile mode, add listeners for mobile UX.
    if(this.state.posts.length){
      clearInterval(this.newsInterval);
      this.currentSlide = 0;
      this.newsInterval = setInterval(()=>{
        this.currentSlide++;
        this.gotoSlide(this.currentSlide)
      }, 3000);
      this.gotoSlide(this.currentSlide);
    }
  }
  gotoSlide(slide){
    if(!this.state.posts.length) return false;

    //
    if(slide > this.state.posts.length-1){
      this.currentSlide = 0;
    }
    const newsList = document.querySelectorAll('.news__post');
    Array.prototype.forEach.call(newsList, item=>
      item.classList.toggle('news__post--visible', false)
    );
    document.querySelector(`.news__post:nth-child(${this.currentSlide+1})`).classList.toggle('news__post--visible', true);
  }
  onResize(){
    this.initHeight = document.querySelector('.header-main .fixer').offsetHeight;
    document.querySelector('.header-main').style.height = this.initHeight+'px';
    document.querySelector('.header-main .fixer').style.position = 'fixed';
  }
  openModalBox(post){
    this.props.openModalBox(NewsWindow, {post: post});
  }
  openLegalModalBox(legals){
    this.props.openModalBox(LegalWindow, {legals: legals});
  }
  render() {
    const {posts, postsLoaded, fixed, legals, legalsLoaded} = this.state;
    return (
      <footer className={`footer-main ${fixed ? 'footer-main--fixed' : ''}`}>
        {posts.length > 0 && (
          <div className="news-wrapper">
            <ul className="news">
              {posts.map( post => (
                <li className="news__post" key={post.id}>
                  <a href="#" onClick={e => {
                    e.preventDefault();
                    this.openModalBox(post)
                  }} >
                    {post.acf.date} <span className="title">{post.title.rendered}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {legalsLoaded && (
          <Link
            className="legals"
            to="/aviso-de-confidencialidad/"
            onClick={e => {
              e.preventDefault();
              this.openLegalModalBox(legals)
            }} >
            Privacy Notice
          </Link>
        )}

        <div className="copyright">© 2018 - Dumont Bergman Bider & Co., S.C.</div>
      </footer>
    );
  }
}
export default Footer;
