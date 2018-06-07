import React, { Component } from 'react';
import axios from 'axios';

import config from '../config';
import TeamBanner from './banners/TeamBanner';
import NewsBanner from './banners/NewsBanner';

class MainBanner extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: {},
      banners: [],
      bannersLoaded: false
    }
  }
  componentDidMount(){
    // Load Content
    axios.get(`${window.DumontSettings.URL.api_baseURL}/pages/`)
    .then(response => {
      const page_content = response.data.find(page => page.slug === 'banners') || {};
      
      //const biography = posts.
      this.setState({
        settings: {
          banner_type: page_content.acf.banner_type
        },
        banners: page_content.acf.banners,
        bannersLoaded: true
      })
    });
  }
  render() {
    const { settings, banners, bannersLoaded } = this.state;

    // Wait for config and banners to load
    if(!bannersLoaded) return null;

    // Render Component
    return (
      <div>
        {settings.banner_type === 'news' ? (
          <NewsBanner banners={banners} />
        ) : (
          <TeamBanner {...this.props} />
        )}
      </div>
    );
  }
}
export default MainBanner;
