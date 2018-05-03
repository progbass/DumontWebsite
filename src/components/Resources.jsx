import React, { Component } from 'react';
import withAccordion from '../withAccordion';

class Resources extends Component {
  render() {
    const {isOpen} = this.props;
    return (
      <section className="section section--spacing resources">
        <div className="section__module">
          <div className="resources__content">
            <p className="resources__description">This section allows our clients to easily download the power of attorney 
            and assignment documents for diﬀerent ﬁlings in Mexico. <br/>
            These documents will be useful in various patent, trademark, copyright 
            and domain name ﬁlings.</p>

            <ul className="resources__list">
              <li className="resources__item">
                <span className="name">Assignment of rights </span>
                <p>Document required for assignment of rights</p>
              </li>
              <li className="resources__item">
                <span className="name">Power Attorney E </span>
                <p>Document required performing different formalities for Entities</p>
              </li>
              <li className="resources__item">
                <span className="name">Power Attorney PI </span>
                <p>Document required performing different formalities for Private individuals </p>
              </li>
            </ul>
          </div>
          <div className="resources__title">
            <h2 className="title-main">Resources</h2>
          </div>
        </div>
      </section>
    );
  }
}
export default Resources;
