import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.scss';
import Scroller from './Scroller';
import Header from './components/Header';
import Footer from './components/Footer';
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
  constructor(props){
    super(props);
    this.state = {
      mobileMode: true,
      shouldOpenModalBox: false,
      modalBoxContent: null,
      modalBoxProps: null,
      teamMember: null,
      breakpoint: null
    }
    this.onResize = this.onResize.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
    this.openModalBox = this.openModalBox.bind(this);
  }
  componentDidMount(){
    window.addEventListener('resize', this.onResize);
    this.onResize()
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.onResize)
  }
  onResize(){
    const windowWidth = window.innerWidth;

    // find current breakpoint.
    let breakpoint// = BREAKPOINTS.MOBILE_SM;
    for (var prop in BREAKPOINTS) {
      if(windowWidth >= BREAKPOINTS[prop]){
        breakpoint = prop;
        break;
      }
    }

    // Update Component state
    this.setState({
      mobileMode: windowWidth < 620,
      breakpoint: breakpoint
    })
  }
  openModalBox(component, props){
    //const shouldOpenWindow = flag ? flag : this.state.shouldOpenModalBox;
    this.setState({
      shouldOpenModalBox: true,
      modalBoxContent: component,
      modalBoxProps: props
    })
  }
  closeModalBox(e){
    this.setState({
      shouldOpenModalBox: false,
      modalBoxContent: null,
      modalBoxProps: null
    })
  }
  render() {
    const { shouldOpenModalBox, modalBoxContent:ModalBoxContent, modalBoxProps } = this.state;

    return (
      <Router>
        <Scroller>
          <div className="App">
            <Header mobileMode={this.state.mobileMode} />

            <div className="sections-wrapper">
              <AboutUs 
                ref={aboutus_ref} 
                mobileMode={this.state.mobileMode}
                breakpoint={this.state.breakpoint} />
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
              <News />
              <Resources />
              <Contact />
            </div>

            <Footer
              openModalBox={this.openModalBox}
              closeModalBox={this.closeModalBox}
              mobileMode={this.state.mobileMode} />

            {(shouldOpenModalBox && ModalBoxContent) && (
              <div className={`modalbox ${shouldOpenModalBox ? 'modalbox--open' : ''}`}>
                <div className="modalbox__overlay" onClick={this.closeModalBox} ></div>
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
