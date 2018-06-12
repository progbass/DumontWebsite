import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import scrollToComponent from 'react-scroll-to-component';
import config from '../config';

const getElemDistance = function ( elem ) {
    var location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location : 0;
};

//
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
    //
    const parsedFlag = typeof(flag) === 'object' ? null : flag;
    this.setState({
      isDescriptionOpen: parsedFlag !== null ? parsedFlag : !this.state.isDescriptionOpen
    });

    // Find current menu item and mark it as active.
    const scrollOffset = document.documentElement.scrollTop + document.querySelector('.header-main').clientHeight;
    const menuList = document.querySelectorAll('.menu .menu__item');
    let currentItem = Array.prototype.filter.call(menuList, menuItem => {
      const section = document.querySelector(`.section.${menuItem.classList.item(1)}`);
      if(!section) return false;
      if(getElemDistance(section) < scrollOffset ) return section;
    });
    currentItem = currentItem[currentItem.length-1];

    try{
      // Remove 'active' class from all items
      Array.prototype.forEach.call(menuList, menuItem => menuItem.classList.toggle('active', false));
      // Mark matching item
      Array.prototype.find.call(menuList, menuItem => {
        if(menuItem.classList.contains(currentItem.classList.item(1))){
          menuItem.classList.toggle('active', true);
          return true
        }
        return false;
      });
    } catch(e){}

    // Horizontal bar indicator
    const docHeight = Math.round(document.body.clientHeight - window.innerHeight);
    const scrollPercentage = (document.documentElement.scrollTop / docHeight) * 100;
    document.querySelector('.header-main__scroller').style.width = `${scrollPercentage}%`;
  }
  render() {
    const {isOpen, navigatingThroughScroll} = this.props;
    const {isDescriptionOpen} = this.state;

    const appPath = window.DumontSettings.path;
    var absoluteURIPath = appPath;//appPath.replace (/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1'); // http or https

    return (
      <header className="header-main">
        <div className="fixer">
          <div className="logo">
            <Link to={`${absoluteURIPath}home`} className="logo__link">
              <img src={`${window.DumontSettings.URL.theme_url}/build/static/media/logo-header.svg`} className="logo__image image--responsive" alt="Dumont Logo" />
            </Link>
          </div>
          
          <div className="header-main__tools">
            <nav className="header-main__navigation">
              <ul className="menu">
                <li className="menu__item about-us">
                  <NavLink
                    onClick={e=>{this.props.onMenuItemClick(false)}}
                    activeClassName={!navigatingThroughScroll ? 'active' : 'inactive'}
                    to={`${absoluteURIPath}about-us`}>
                    About Us
                  </NavLink>
                </li>
                <li className="menu__item our-team">
                  <NavLink
                    onClick={e=>{this.props.onMenuItemClick(false)}}
                    activeClassName={!navigatingThroughScroll ? 'active' : 'inactive'}
                    to={`${absoluteURIPath}our-team`}>
                    Our Team
                  </NavLink>
                </li>
                <li className="menu__item our-services">
                  <NavLink
                    onClick={e=>{this.props.onMenuItemClick(false)}}
                    activeClassName={!navigatingThroughScroll ? 'active' : 'inactive'}
                    to={`${absoluteURIPath}our-services`}>
                    Our Services
                  </NavLink>
                </li>
                <li className="menu__item news">
                  <NavLink
                    onClick={e=>{this.props.onMenuItemClick(false)}}
                    activeClassName={!navigatingThroughScroll ? 'active' : 'inactive'}
                    to={`${absoluteURIPath}news`}>
                    News
                  </NavLink>
                </li>
                <li className="menu__item resources">
                  <NavLink
                    onClick={e=>{this.props.onMenuItemClick(false)}}
                    activeClassName={!navigatingThroughScroll ? 'active' : 'inactive'}
                    to={`${absoluteURIPath}resources`}>
                    Resources
                  </NavLink>
                </li>
                <li className="menu__item contact">
                  <NavLink
                    onClick={e=>{this.props.onMenuItemClick(false)}}
                    activeClassName={!navigatingThroughScroll ? 'active' : 'inactive'}
                    to={`${absoluteURIPath}contact`}>
                    Contact
                  </NavLink>
                </li>
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
