import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default ({onClick, ...props}) => (
    <li className="service copyright" onClick={onClick}>
        <div className="service__content">
          <div className="header">
            <h4 className="subtitle">What we do</h4>
            <h3 className="title-main">Copyright</h3>
          </div>
          <div className="detail">
            <p>Dumont provides comprehensive advice regarding all matters related to 
            copyrights and related rights. The ﬁrm’s services include the registration of 
            all types of works provided by Mexico’s Federal Law on Copyrights, drafting 
            of agreements, as well as advice on possible infringement cases</p>
            <p>Our team includes very qualiﬁed attorneys who have been dealing with the 
            entertainment industry for years, providing invaluable advice and helping 
            clients to ﬁnd the best strategy to exploit and defend their copyrights.</p>
            <p>Under Mexican legislation, an author is granted a moral and inheritable right 
            to his/her work. In general terms, these rights allow the author to ensure the 
            full disposal of his/her work and its exclusive exploitation.</p>
            <p>Therefore, one of our goals is to help our clients understand the scope of 
            protection granted by the law and the applicable limitations in their 
            circumstances. We explain to clients how eﬀective copyright protection is for 
            them and what the available legal remedies and actions are that the author 
            could consider in case of copyright infringement.</p>
            <p>In litigation, we represent our clients before the Mexican Copyright Oﬃce or 
            Civil Court (at ﬁrst instance), the Federal Administrative Court or Court of 
            Appeals (at second instance), and the Federal Circuit Court (at third instance). 
            Our passion and enthusiasm for creating an eﬀective strategy to defend our 
            clients’ copyrights in court set us apart from our competitors.</p>
            
            {/*
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
            */}
          </div>
        </div>
      </li>
);
