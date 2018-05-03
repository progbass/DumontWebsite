import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default ({onClick, ...props}) => (
  <li className="service personal-data" onClick={onClick}>
    <div className="service__content">
      <div className="header">
        <h4 className="subtitle">What we do</h4>
        <h3 className="title-main">Personal Data Protection</h3>
      </div>
      <div className="detail">
        <p>Dumont’s personal data protection practice is rooted in the recognition that 
        the protection of personal data is a fundamental, constitutional right that it is 
        the responsibility of all relevant stakeholders to preserve.</p>
        <p>We help our clients to protect one of their most important assets their 
        information. In addition, the ﬁrm helps to ﬁght ﬁnes for unfulﬁllment of the 
        Federal Law on Protection of Personal Data that may rise to more than $25 million pesos.</p>
        <p>Dumont has highly-qualiﬁed attorneys in this area who fulﬁll their clients’ 
        needs with a high level of professionalism, knowledge, and service that is  
        tailored to their individual situations.</p>
        <p>Dumont’s personal data protection practice oﬀers clients training and 
        education, counseling, compliance, drafting of privacy policies, litigation 
        regarding personal data protection, contract drafting, enforcement of ARCO 
        rights, and elaboration of operation manuals, among other servies.</p>
        <p>Additionally, the ﬁrm  represents clients in personal data protection litigation 
        before the National Institute of Transparency Access to Information and 
        Protection of Personal Data, before the Federal Court of Administrative 
        Justice, and before the federal courts and other courts.</p>
      </div>
    </div>
  </li>
);
