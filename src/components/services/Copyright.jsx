import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default ({onClick, service, ...props}) => (
    <li className="service copyright" onClick={onClick}>
        <div className="service__content">
          <div className="header">
            <h4 className="subtitle">What we do</h4>
            <h3 className="title-main"
              dangerouslySetInnerHTML={{__html:service.title.rendered}} />
          </div>
          <div className="detail"
            dangerouslySetInnerHTML={{__html:service.content.rendered}} />
        </div>
    </li>
);
