
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// containers
import App from './ui/App.js';


import NewActivity from './ui/NewActivity.js';
import AdminActivities from './ui/AdminActivities.js';
import ActivityDetail from './ui/ActivityDetail.js';


export const AppRoutes = () => (
  <Router>
    <div>
      <Route exact path='/' component={App}/>
      <Route exact path='/new' component={NewActivity}/>
      <Route exact path='/admin' component={AdminActivities}/>
      <Route exact path='/activity/:id' component={ActivityDetail}/>
    </div>
  </Router>
);