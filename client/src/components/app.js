import React from 'react';
import {Route} from 'react-router-dom';

import Nav from './nav'; 
import Home from './home';
import MainContent from './mainContent';

const App = () => (
    <div className='container'>
        <Nav/>
        <Home/>
        <MainContent/>
    </div>
);

export default App;
