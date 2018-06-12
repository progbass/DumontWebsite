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
          banner_type: page_content.acf.banner_type,
          banner_interval_delay: page_content.acf.banner_interval_delay*1000 || 5000
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
          <NewsBanner banners={banners} delay={settings.banner_interval_delay} />
        ) : (
          <TeamBanner {...this.props} />
        )}
      </div>
    );
  }
}
export default MainBanner;
