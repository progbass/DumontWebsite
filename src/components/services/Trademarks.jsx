import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default ({onClick, ...props}) => (
  <li className="service trademarks" onClick={onClick}>
    <div className="service__content">
      <div className="header">
        <h4 className="subtitle">What we do</h4>
        <h3 className="title-main">Trademarks</h3>
      </div>
      <div className="detail">
        <p>Dumont’s Trademarks Department takes a unique approach to serving its 
        clients. We place the clients’ interests ﬁrst, put ourselves in our clients’ shoes, 
        and do our best to understand their business and needs in Mexico, oﬀering 
        solutions that are tailored to their smooth entry into the Mexican market. As 
        part of this approach, we advise clients on all possible risks in adopting a 
        certain trademark when we deem it appropriate, and propose alternatives 
        which will allow them to be successful in terms of securing their rights and 
        making their trademark attractive to the Mexican market.</p>
        <p>Our team is deeply experienced and ﬂuent in all aspects of trademark and 
        slogan protection, from ﬁling, prosecution, registration and maintenance, to 
        complex transactional and licensing work.</p>
        <p>Our clients receive the best possible services geared to developing a brand 
        protection strategy that not only matches their business goals, but also 
        mitigates any possible risk by ensuring their rights will be secure should they 
        need to be enforced.</p>
        <p>We are driven by our clients to be highly specialized across a range of 
        industries, from healthcare and pharmaceuticals, fashion and luxury, to IT 
        and sports, which allows us to advise on the best approach to protection, as 
        well as to highlight any related regulatory issues.</p>
        
        <div className="offer">
          <h4 className="offer__title">We oﬀer a wide range of services through our Trademark Department, includes: </h4>
          <ul className="offer__list">
            <li className="offer__item">Due diligence</li>
            <li className="offer__item">Comprehensive registry and commercial availability searches</li>
            <li className="offer__item">Filing and prosecution of both national and international (Madrid System) trademarks</li>
            <li className="offer__item">Portfolio management in Mexico and Central and South America as well at the Caribbean</li>
            <li className="offer__item">Comprehensive trademark watching on both registries and commerce</li>
            <li className="offer__item">Licensing and transactional</li>
            <li className="offer__item">Customs registration</li>
          </ul>
        </div>
      </div>
    </div>
  </li>
);
