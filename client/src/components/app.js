import React from 'react';
import {Route} from 'react-router-dom';

import Nav from './home_page/nav'; 
import Home from './home_page/home';
import Join from './joining/join';
import Create from './creating/create';

const App = () => (
    <div className='container'>
        <Nav/>
        <Route exact path="/" component={Home}/>
        <Route path="/join" component={Join}/>
        <Route path="/create" component={Create}/>
        {/* <Route path="/profile" component={Profile}/> */}
    </div>
);

export default App;
