import React from 'react';
import {GITHUB_REPOSITORY} from '../lib/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLinkedin, faTwitterSquare} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="ui vertical footer segment">
      <div className="ui center aligned container horizontal small divided link list">
        <div className="">
         
            
            <FontAwesomeIcon
              size="1x"
              className="text-gray-200"
              icon={faTwitterSquare}
            />

            <i className="fab fa-twitter-square"></i>
         
            
            <FontAwesomeIcon
              size="1x"
              className="text-gray-200"
              icon={faLinkedin}
            />
        </div>
        <a
          className="font-medium hover:underline"
        >
Sanskriti - Social media app        </a>
      </div>
    </div>
  );
};

export default Footer;
