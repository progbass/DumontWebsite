import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default ({onClick, ...props}) => (
  <li className="service patents"  onClick={onClick}>
    <div className="service__content">
      <div className="header">
        <h4 className="subtitle">What we do</h4>
        <h3 className="title-main">Patents</h3>
      </div>
      <div className="detail">
        <p>Dumont’s Patents Department is dedicated to ensuring its clients conﬁdence 
        in the ﬁrm’s ability to protect their eﬀorts to contribute to technological 
        development. With a specialized team, Dumont oﬀers services directed to 
        ﬁling, prosecuting, maintaining, and capitalizing on rights in all types of rights 
        related to inventions, such as patents, utility models, industrial designs, plant 
        varieties, integrated circuit layouts, and trade secrets.</p>
        <p>With a long-lasting tradition as a patent law ﬁrm, Dumont stands out as one 
        of the most reliable and proﬁcient ﬁrms in Mexico providing patent 
        counseling services. As a result, Dumont is currently in charge of handing 
        signiﬁcant patent portfolios for clients in a variety of industries, such as metal 
        alloys, glass, plastics, ceramics, oil and gas, electronics, optics, medical 
        devices, healthcare, pulp and paper, pharma, biotech, security inks, 
        machinery, among others.</p>
        <p>Aiming to optimize prosecution times and costs, Dumont has developed and 
        trained a dedicated technical team able to provide advice during substantive 
        examination. At this stage, clients receive not only a simple report of oﬃce 
        actions, but a complete analysis of the objections, an explanation thereof 
        under the local practice and law, and a complete description of the best 
        course of action to resolve the case, no matter the complexity of the 
        invention. Our goal is always to reaching a balance between the broadest 
        achievable scope and simpliﬁed prosecution.</p>
        <p>In addition to patent drafting, the patent department is proud of its ability to 
        engage in technically complex tasks such as patentability searches and 
        opinions, Freedom-to-Operate search and analysis, expert opinions for 
        litigation, draft and review of know-how agreements, and draft and review of 
        licensing agreements. Each of these services is performed using the most 
        state-of-the-art technologies. </p>
        <p>Using the ﬁrm’s exceptional knowledge of the domestic patent and 
        regulatory systems, the ﬁrm counsels pharma and biotech clients on issues 
        surrounding the local linkage system established between the sanitary 
        authority (COFEPRIS) and the patent oﬃce, allowing companies to attain and 
        uphold their best market position in relation to their competitors.</p>
        <p>In the ever-evolving telecom environment, Dumont has developed special
        capabilities to perform essentiality evaluations of patents granted on 
        internationally standardized technologies such as the 3G technology, IETF 
        Internet Protocols, HDMI, Long Term Evolution (LTE) and LongTerm Evolution – Advanced (4G) technologies, WiFi, WiMax, and the like.</p>
        
        <div className="offer">
          <h4 className="offer__title">Other services oﬀered include: </h4>
          <ul className="offer__list">
            <li className="offer__item">Drafting and recordation of license agreements</li>
            <li className="offer__item">Drafting and recordation of assignment agreements</li>
            <li className="offer__item">Surveillance and maintenance of rights</li>
            <li className="offer__item">Filing of PPH requests for expediting examination</li>
            <li className="offer__item">Intervening in [?] and responding to third party observations</li>
            <li className="offer__item">Watch services</li>
          </ul>
        </div>
      </div>
    </div>
  </li>
);
