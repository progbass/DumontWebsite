import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default ({onClick, ...props}) => (
  <li className="service litigation" onClick={onClick}>
    <div className="service__content">
      <div className="header">
        <h4 className="subtitle">What we do</h4>
        <h3 className="title-main">Litigation</h3>
      </div>
      <div className="detail">
        <p>We are a group of litigators who have successfully handled hundreds of IP 
        disputes for a variety of clients from multinational corporations to small, 
        local startups and individuals. We have been involved in many high-proﬁle 
        trademark and patent cases over the years, and have consequently acquired 
        vast experience in the ﬁeld.</p>
        <p>Our unique approach always starts with understanding our clients’ assets 
        and needs to provide them with tailor-made and business-oriented 
        strategies to obtain the best possible outcome. From our perspective, 
        litigation should be treated as a business tool, rather than a means to an end.</p>
        <p>We represent our clients before the Mexican Patent and Trademark Oﬃce, 
        the Federal Administrative Court, the Federal Circuit Court, and the Mexican 
        Supreme Court. Our passion and enthusiasm for creating a strategy and 
        litigating to defend our clients’ IP rights at court set us apart from our competitors.</p>
        
        <div className="offer">
          <h4 className="offer__title">Dumont’s IP litigation services include:</h4>
          <ul className="offer__list">
            <li className="offer__item">Preliminary investigations associated with possible infringement of IP rights</li>
            <li className="offer__item">Cancellation, invalidation and infringement actions before the Mexican Patent and Trademark Oﬃce</li>
            <li className="offer__item">Anticounterfeiting</li>
            <li className="offer__item">Appeals before the Federal Administrative Court</li>
            <li className="offer__item">Constitutional Appeals (Amparo) before the Federal Circuit Court</li>
            <li className="offer__item">Domain name disputes before WIPO</li>
            <li className="offer__item">IP Agreements</li>
            <li className="offer__item">Arbitration and Settlement negotiations</li>
          </ul>
        </div>
      </div>
    </div>
  </li>
);
