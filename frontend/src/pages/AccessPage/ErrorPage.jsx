import React from 'react';
import './ErrorPage.css'; // Import the CSS file
import { FaAngleRight } from 'react-icons/fa'; // Import the right arrow icon
import LeftMenu from '../../components/LeftMenu';
import RightMenu from '../../components/RightMenu';


const ErrorPage = () => {
  return (
    <div className='flex'>
            <LeftMenu />
    <div className="w-full">

    <div className="error-page">
      <h1>404</h1>
      <h2>Oops...</h2>
      <p>We cannot find this page</p>
      <div className="link-container">
      <a href="/" className="link-text">

        <span>Let's try something different</span>
        </a>
        <FaAngleRight className="arrow-icon" />
      </div>
    </div>
    </div>
    <RightMenu />
        </div>
  );
};

export default ErrorPage;
