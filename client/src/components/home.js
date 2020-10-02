import React from 'react';
import './homeCss.css';
import Catalogue from './catalogue/Catalogue';
import { Redirect } from 'react-router-dom';
import Navbar from '../components/barraNav/Nav';

function Home() {
  return (
    <div className='App'>
      <Navbar />
      <Catalogue />
      <Redirect
        from='/'
        to='/home'
      />
    </div>
  );
}
export default Home;
