import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.scss';
import Scroller from './Scroller';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import OurTeam from './components/OurTeam';
import Services from './components/Services';
import Contact from './components/Contact';
import Resources from './components/Resources';
//
const aboutus_ref = React.createRef();
const ourteam_ref = React.createRef();
const services_ref = React.createRef();

//
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mobileMode: true,
      shouldOpenModalBox: false,
      modalBoxContent: null,
      teamMember: null
    }
    this.onResize = this.onResize.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
    this.openModalBox = this.openModalBox.bind(this);
  }
  componentDidMount(){
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.onResize)
  }
  onResize(){
    this.setState({
      mobileMode: window.innerWidth > 620
    })
  }
  openModalBox(window){
    //const shouldOpenWindow = flag ? flag : this.state.shouldOpenModalBox;
    this.setState({
      shouldOpenModalBox: true,
      modalBoxContent: window
    })
  }
  closeModalBox(){
    this.setState({
      shouldOpenModalBox: false,
      modalBoxContent: null
    })
  }
  render() {
    const { shouldOpenModalBox, modalBoxContent } = this.state;
    console.log(modalBoxContent, ' open')
    return (
      <Router>
        <Scroller>
          <div className="App">
            <Header mobileMode={this.state.mobileMode} />
            <AboutUs ref={aboutus_ref} mobileMode={this.state.mobileMode} />
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
            <Resources />
            <Contact />

            {(shouldOpenModalBox && modalBoxContent) && (
              <div onClick={this.closeModalBox} className={`modalbox section--spacing ${shouldOpenModalBox ? 'modalbox--open' : ''}`}>
                {modalBoxContent}
              </div>
            )}
          </div>
        </Scroller>
      </Router>
    );
  }
}

export default App;
