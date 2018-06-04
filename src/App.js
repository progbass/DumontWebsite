import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import './App.scss';
import config from './config';

import Scroller from './Scroller';
import Header from './components/Header';
import Footer from './components/Footer';
import MainBanner from './components/MainBanner';
import AboutUs from './components/AboutUs';
import OurTeam from './components/OurTeam';
import Services from './components/Services';
import News from './components/News';
import Contact from './components/Contact';
import Resources from './components/Resources';
//
const aboutus_ref = React.createRef();
const ourteam_ref = React.createRef();
const services_ref = React.createRef();
const news_ref = React.createRef();

//
const EM_VALUE = 16;
const BREAKPOINTS = {
  DESKTOP_XL: 80 * EM_VALUE,
  DESKTOP_L: 64 * EM_VALUE,
  DESKTOP_M: 60 * EM_VALUE,
  TABLET_L: 50 * EM_VALUE,
  TABLET_M: 45.5 * EM_VALUE,
  TABLET_SM: 30 * EM_VALUE,
  MOBILE_M: 25 * EM_VALUE,
  MOBILE_SM: 20 * EM_VALUE
}

//
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMode: true,
      shouldOpenModalBox: false,
      modalBoxContent: null,
      modalBoxProps: null,
      teamMember: null,
      breakpoint: null,
      navigatingThroughScroll: true,
    }
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
    this.openModalBox = this.openModalBox.bind(this);
    this.updateNavigationMode = this.updateNavigationMode.bind(this);
    this.sendContactForm = this.sendContactForm.bind(this);
    this.fixedScrollPosition = 0;
  }
  componentDidMount() {
    console.log('SETTINGS ', window.DumontSettings.URL)
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);
    this.onResize();
    this.onScroll();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll() {
    const scrollOffset = document.documentElement.scrollTop;
    if (scrollOffset < 500)
      document.querySelector('.back-to-top').style.visibility = 'hidden';
    else
      document.querySelector('.back-to-top').style.visibility = 'visible';
  }
  onResize() {
    const windowWidth = window.innerWidth;

    // find current breakpoint.
    let breakpoint// = BREAKPOINTS.MOBILE_SM;
    for (var prop in BREAKPOINTS) {
      if (windowWidth >= BREAKPOINTS[prop]) {
        breakpoint = prop;
        break;
      }
    }

    // Update Component state
    this.setState({
      mobileMode: windowWidth < BREAKPOINTS.TABLET_M,
      breakpoint: breakpoint
    })
  }
  updateNavigationMode(flag) {
    this.setState({
      navigatingThroughScroll: flag
    })
  }
  openModalBox(component, props) {
    // Get Scroll Position
    this.fixedScrollPosition = document.documentElement.scrollTop;
    document.querySelector('.App > .sections-wrapper').style.position = 'fixed';
    document.querySelector('.App > .sections-wrapper').style.top = `-${this.fixedScrollPosition}px`;


    //const shouldOpenWindow = flag ? flag : this.state.shouldOpenModalBox;
    this.setState({
      shouldOpenModalBox: true,
      modalBoxContent: component,
      modalBoxProps: props
    })
  }
  closeModalBox(e) {
    document.querySelector('.App > .sections-wrapper').style.position = 'relative';
    document.querySelector('.App > .sections-wrapper').style.top = `auto`;
    window.scrollTo(0, this.fixedScrollPosition);

    // Update App State
    this.setState({
      shouldOpenModalBox: false,
      modalBoxContent: null,
      modalBoxProps: null
    })
  }
  sendContactForm(mailData){
    // Send form
    return axios.post(`${window.DumontSettings.URL.theme_url}/mail.php`, mailData);
  }
  render() {
    const { shouldOpenModalBox, modalBoxProps = {}, modalBoxContent: ModalBoxContent } = this.state;
    const customOverlayClass = modalBoxProps && 'customOverlayClass' in modalBoxProps ? modalBoxProps.customOverlayClass : '';

    return (
      <Router>
        <Scroller>
          <div className="App">
            <Header
              navigatingThroughScroll={this.state.navigatingThroughScroll}
              onMenuItemClick={this.updateNavigationMode}
              mobileMode={this.state.mobileMode} />

            <div className="sections-wrapper">
              <MainBanner
                mobileMode={this.state.mobileMode}
                breakpoint={this.state.breakpoint} />
              <AboutUs
                ref={aboutus_ref}
                mobileMode={this.state.mobileMode} />
              <OurTeam
                ref={ourteam_ref}
                mobileMode={this.state.mobileMode}
                openModalBox={this.openModalBox}
                closeModalBox={this.closeModalBox} />
              <Services
                ref={services_ref}
                mobileMode={this.state.mobileMode}
                openModalBox={this.openModalBox}
                closeModalBox={this.closeModalBox} />
              <News
                ref={news_ref}
                mobileMode={this.state.mobileMode}
                openModalBox={this.openModalBox}
                closeModalBox={this.closeModalBox} />
              <Resources />
              <Contact
                sendContactForm={this.sendContactForm} />

              <Link to="/home" className="back-to-top">Regresar</Link>
            </div>

            <Footer
              openModalBox={this.openModalBox}
              closeModalBox={this.closeModalBox}
              mobileMode={this.state.mobileMode} />

            {(shouldOpenModalBox && ModalBoxContent) && (
              <div className={`modalbox ${shouldOpenModalBox ? 'modalbox--open' : ''}`}>
                <div className={`modalbox__overlay ${customOverlayClass}`} onClick={this.closeModalBox} ></div>
                {<ModalBoxContent {...modalBoxProps} />}
              </div>
            )}
          </div>
        </Scroller>
      </Router>
    );
  }
}

export default App;
