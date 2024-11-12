import React from 'react';
import './ErrorPage2.css'; // Import the CSS file
import { FaAngleRight } from 'react-icons/fa'; // Import the right arrow icon
import LeftMenu from '../../components/LeftMenu';
import RightMenu from '../../components/RightMenu';




const ErrorPage = () => {
  return (
    <div className='flex'>
            <LeftMenu />
    <div className="w-full">

    <div className="error-page">
      <h1>403</h1>
      <h2>Access Denied</h2>
      <p>Sorry,You don't<br/>have access to <br/>this page</p>
      <div className="link-container">
      <a href="/" className="link-text">
      <span>Go back to the Previous page</span>
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
