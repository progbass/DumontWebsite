import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default ({onClick, ...props}) => (
    <li className="service enforcement" onClick={onClick}>
        <div className="service__content">
          <div className="header">
            <h4 className="subtitle">What we do</h4>
            <h3 className="title-main">Enforcement</h3>
          </div>
          <div className="detail">
            <p>Counterfeiting of products is a scourge that can have a detrimental eﬀect on 
            the economy of any country.</p>
            <p>At Dumont, we are committed to the protection of intellectual property rights 
            in all areas, including criminal actions against those selling, marketing, 
            distributing or importing counterfeited merchandise. Measures are taken at 
            the border to make sure goods that are counterfeits, and thus infringe 
            Intellectual Property rights, do not make it into Mexico.</p>
            <p>We have direct contact with Mexican Customs to coordinate appropriate 
            actions to be taken and to help our clients ensure that their position in the 
            market is not compromised by counterfeit products.</p>
          </div>
        </div>
      </li>
);
