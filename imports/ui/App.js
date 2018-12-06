import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ActivitiesList from './ListaActivities.js';
import Inicio from './Inicio.js';
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
        {!!Meteor.user() ?
          <ActivitiesList/>:<Inicio/>
        }
        <div className="footer">
          <p>Juan Sebastián Millán L - Andrés Felipe Lopez. <br/> All Rights Reserved.</p>
        </div>
      </div>
    );
  }
}

//En el HTML del cliente, es decir, main.html se puede agregar todo lo que es estático. Como sus nombres y los derechos de autor.

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(App);
