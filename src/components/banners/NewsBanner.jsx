import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';

const BANNER_TYPES = {
  IMAGE: 'image',
  PHRASE: 'phrase'
}

class NewsBanner extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageBanners: []
    }
    this.onResize = this.onResize.bind(this);
    this.renderImageSlide = this.renderImageSlide.bind(this);
    this.addEventListeners = this.addEventListeners.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.banners !== this.props.banners){
      this.setState({
        imageBanners: nextProps.banners.filter(banner => banner.type === BANNER_TYPES.IMAGE)
      }, ()=>{
        this.removeEventListeners();
        this.addEventListeners();
      })
    }
  }
  componentDidMount(){
    this.setState({
      imageBanners: this.props.banners.filter(banner => banner.type === BANNER_TYPES.IMAGE)
    }, ()=>{
      this.addEventListeners();
    })
  }
  componentWillUnmount(){
    this.removeEventListeners();
  }
  shouldComponentUpdate(nextProps){
    return this.props.banners !== nextProps.banners
  }

  addEventListeners(){
    const scope = this;
    const images = [].slice.call(document.querySelectorAll('.slider-slide .image'));
    images.forEach(image => {
      image.onload = function() {
        scope.onResize();
      }
      image.src = image.getAttribute('src');
    });

    window.addEventListener('resize', this.onResize);
  }
  removeEventListeners(){
    //const images = [].slice.call(document.querySelectorAll('.slider-slide .image'));
    window.removeEventListener('resize', this.onResize);
  }
  onResize(){
    const images = [].slice.call(document.querySelectorAll('.slider-slide .image'));
    images.forEach(image => {
      // Get Ratios
      const parentRatio = image.parentNode.offsetHeight / image.parentNode.offsetWidth; 
      const imageRatio = image.offsetHeight / image.offsetWidth;

      // Get Image Format
      let isVertical = false;
      if(imageRatio >= parentRatio){
        isVertical = true;
      }
      image.classList.toggle('vertical', isVertical)
    })
  }
  renderImageSlide(banner){
    const linkPath = banner.image_link;
    var absolutePath = linkPath.replace (/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1'); // http or https

    if(banner.image_link !== ''){
      return (
        <Link to={`/${absolutePath}`} className="link" >
          <img  
            className="image"
            key={banner.id}
            src={banner.image} />
        </Link>
      )
    } else {
      return <img key={banner.id} src={banner.image} />
    }
  }
  render() {
    const { banners } = this.props;

    // Render Component
    return (
      <section className="home main-banner section">
        <div className="section--dark section--spacing heroe-banner carousel">
          {banners.length > 0 && (
            <Carousel
              autoplay
              wrapAround
              dragging={false}
              swiping={false}
              slidesToShow="1"
              heightMode="first"
              width="100%"
              renderCenterLeftControls={()=>false}
              renderCenterRightControls={()=>false}
              renderBottomCenterControls={()=>false} >
              {banners.map(banner => {
                return banner.type === BANNER_TYPES.PHRASE ? (
                    <div className="phrase"><h2 className="phrase__text">{banner.phrase}</h2></div>
                  ) : (
                    this.renderImageSlide(banner)
                  )
              })}
            </Carousel>
          )}
        </div>
      </section>
    );
  }
}
export default NewsBanner;
