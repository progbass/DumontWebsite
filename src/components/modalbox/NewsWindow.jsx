import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

const scrollConfig = { offset: 0, align: 'top', duration: 1000 };
class NewsWindow extends Component {
  constructor(props){
    super(props);
    this.state = {
      article: null
    }
  }
  componentDidMount(){
    // Load Content
    axios.get(`${window.DumontSettings.URL.api_baseURL}/news-section?slug=${this.props.match.params.article}/`)
    .then(response => {
      this.setState({
        article: response.data[0]
      })
    });
  }
  render() {
    const {article:post} = this.state;

    if(!post) return null;

    // Render Component
    return (
      <div className="modalbox__container news-modalbox section--spacing ">
        <div className="news-modalbox__info">
          <h2 className="name"
          dangerouslySetInnerHTML={{__html:post.title.rendered}} />

          <div className="news-modalbox__cover">
            <img className="image--responsive" src={post.better_featured_image.source_url} alt={post.title.rendered} />
          </div>

          <div className="news-modalbox__meta">
            <div className="date">
              {post.acf.date}
            </div>
            {post.acf.source !== '' && (
              <div className="source">
                Fuente: {post.acf.source}
              </div>
            )}
          </div>
        </div>

        <div
          className="news-modalbox__content"
          dangerouslySetInnerHTML={{__html:post.content.rendered}} />
      </div>
    );
  }
}
export default withRouter(NewsWindow);
