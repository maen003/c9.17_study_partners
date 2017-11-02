import React from 'react';
import {Route} from 'react-router-dom';

import Nav from './home_page/nav'; 
import Home from './home_page/home';
import MainContent from './home_page/mainContent';

const App = () => (
    <div className='container'>
        <Nav/>
        <Home/>
        <MainContent/>
    </div>
);

export default App;
