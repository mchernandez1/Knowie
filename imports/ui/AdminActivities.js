import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import { Redirect} from 'react-router';

import { Activities } from '../api/activities.js';

import Navbar from './Navbar.js';

class AdminActivities extends Component {

  constructor(props){
    super(props);

  }

  renderTableRow(){
    return this.props.adminActivities.map((activity) => (
      <tr>
        <td>{activity.title}</td>
        <td>{activity.date}</td>
        <td>{activity.place}</td>
        <td>{activity.capacity}</td>
      </tr>
    ));
  }



  render() {


    return (
      <div>
        <Navbar/>
        <br/>
        <br/>
        <div id="contenedorNuevaAct" className="container form-container">
          <div className="row">
            <div className="col-9">
              <div className="form-title">
                <h3 className="titleAdminActivities">Actividades creadas: </h3>
              </div>
              <br/>
              <div>
                <table>
                  <tr>
                    <th>Actividad</th>
                    <th>Fecha</th>
                    <th>Lugar</th>
                    <th>Cupos Disponibles</th>
                  </tr>
                  {this.renderTableRow()}
                </table>

              </div>
  

              <br/>
              <br/>
            </div>

          </div>
        </div>  

      </div>
    );
  }

}

export default withTracker(() => {
  Meteor.subscribe('activities');

  return {
    currentUser: Meteor.user(),
    adminActivities: Activities.find({username: Meteor.user().username}, {sort: {date: 1}}).fetch(),
  };
})(AdminActivities);