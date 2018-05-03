import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import scrollToComponent from 'react-scroll-to-component';

const scrollConfig = { offset: 0, align: 'top', duration: 1000 };
class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDescriptionOpen: false
    }
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.initHeight = 0;
  }
  componentWillReceiveProps(nextProps){
    if(this.props.mobileMode !== nextProps.mobileMode){
    }
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll)
  }
  componentDidMount(){
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);
    setTimeout(this.onResize, 1000);
  }
  onResize(){
    this.initHeight = document.querySelector('.header-main .fixer').offsetHeight;
    document.querySelector('.header-main').style.height = this.initHeight+'px';
    document.querySelector('.header-main .fixer').style.position = 'fixed';
  }
  onScroll(flag){
    const parsedFlag = typeof(flag) === 'object' ? null : flag;
    this.setState({
      isDescriptionOpen: parsedFlag !== null ? parsedFlag : !this.state.isDescriptionOpen
    })
  }
  render() {
    const {isOpen} = this.props;
    const {isDescriptionOpen} = this.state;
    return (
      <header className="header-main">
        <div className="fixer">
          <div className="logo">
            <a href="/" className="logo__link">
              <img src={require('../img/logo-header.svg')} className="logo__image image--responsive" alt="Dumont Logo" />
            </a>
          </div>
          
          <div className="header-main__tools">
            <nav className="header-main__navigation">
              <ul className="menu">
                <li className="menu__item"><NavLink activeClassName="active" to="/about-us">About Us</NavLink></li>
                <li className="menu__item"><NavLink activeClassName="active" to="/our-team">Our Team</NavLink></li>
                <li className="menu__item"><NavLink activeClassName="active" to="/our-services">Our Services</NavLink></li>
                <li className="menu__item"><NavLink activeClassName="active" to="/news">News</NavLink></li>
                <li className="menu__item"><NavLink activeClassName="active" to="/resources">Resources</NavLink></li>
                <li className="menu__item"><NavLink activeClassName="active" to="/contact">Contact</NavLink></li>
              </ul>
            </nav>

            <div className="header-main__utils">
              <form className="searchbox">
                <input type="text" name="search" value="" placeholder="" />
              </form>
              <ul className="languages">
                <li className="language"><a href="/" className="language__link active">EN</a></li>
                <li className="language"><a href="/" className="language__link">ES</a></li>
              </ul>
            </div>
          </div>

          <div className="header-main__scroller"></div>
        </div>
      </header>
    );
  }
}
export default Header;
