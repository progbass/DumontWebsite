import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

import config from '../../config';


class LegalWindow extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {legals} = this.props;
    if(!legals) return null;

    // Render Component
    return (
      <div className="modalbox__container legals-modalbox section--spacing ">
        <div
          className="legals-modalbox__content"
          dangerouslySetInnerHTML={{__html:legals.content.rendered}} />
      </div>
    );
  }
}
export default LegalWindow;
