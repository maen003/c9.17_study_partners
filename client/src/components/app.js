import React from 'react';
import {Route} from 'react-router-dom';

import Nav from './home_page/nav'; 
import Home from './home_page/home';
import MainContent from './home_page/mainContent';

import LoginModal from './modal/login_modal';

const App = () => (
    <div className='container'>
        <Nav/>
        <Home/>
        <LoginModal/>
        <MainContent/>
    </div>
);

export default App;
