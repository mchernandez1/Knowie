import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Activities } from '../api/activities.js';
 
import Navbar from './Navbar.js';
import Activity from './Activity.js';
 
// App component - represents the whole app
class App extends Component {
 
  renderActivities() {
    return this.props.activities.map((activity) => (
      <Activity key={activity._id} activity={activity} />
    ));
  }
 
  render() {
    return (
      <div>
        <Navbar/>
      
        <div className="container">
          <header>
            <h1>Actividades Uniandes</h1>
          </header>
  
          <ul>
            {this.renderActivities()}
          </ul>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    activities: Activities.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);