import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import { Redirect} from 'react-router';

import { Activities } from '../api/activities.js';

import Navbar from './Navbar.js';

class NewActivity extends Component {

  constructor(props){
    super(props);

    this.state = {
      errorMessage: '',
      finished: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    let success = true;

    const title = ReactDOM.findDOMNode(this.refs.titleActivity).value.trim();
    const hashtag = ReactDOM.findDOMNode(this.refs.hashtagActivity).value.trim();
    const place = ReactDOM.findDOMNode(this.refs.placeActivity).value.trim();
    const date = ReactDOM.findDOMNode(this.refs.dateActivity).value.trim();
    const initTime = ReactDOM.findDOMNode(this.refs.initTimeActivity).value.trim();
    const finishTime= ReactDOM.findDOMNode(this.refs.finishTimeActivity).value.trim();
    const capacity = parseInt(ReactDOM.findDOMNode(this.refs.capacityActivity).value.trim(), 10);
    const price = parseInt(ReactDOM.findDOMNode(this.refs.priceActivity).value.trim(), 10);


    console.log(title);
    console.log(place);
    console.log(date);
    console.log(initTime);
    console.log(finishTime);
    console.log(capacity);
    console.log(price);


    let stringDate = date.replace(/-/g, '/');
    let dateActivity = new Date(stringDate);
    let dateActual = new Date();

    if(dateActual > dateActivity){
      console.log('La fecha de inicio seleccionada ya ocurrió');
      this.setState({
        errorMessage: 'La fecha de inicio seleccionada ya ocurrió.',
      });
      success = false;
    }

    if(Date.parse('01/01/2011 ' + initTime) > Date.parse('01/01/2011 ' + finishTime)){
      console.log('La hora de inicio debe ser antes que la hora de fin');
      this.setState({
        errorMessage: 'La hora de inicio debe ser antes que la hora de fin.',
      });
      success = false;
    }

    if(capacity < 0) {
      console.log('La capacidad de la actividad no puede ser negativa.');
      this.setState({
        errorMessage: 'La capacidad de la actividad no puede ser negativa.',
      });
      success = false;
    }

    if(price < 0) {
      console.log('El precio de la actividad no puede ser negativo.');
      this.setState({
        errorMessage: 'El precio de la actividad no puede ser negativo.',
      });
      success = false;
    }


    

    if(success) {

      Meteor.call('activities.insert', title, place, date, initTime, finishTime, capacity, price, hashtag);

      ReactDOM.findDOMNode(this.refs.titleActivity).value = '';
      ReactDOM.findDOMNode(this.refs.placeActivity).value = '';
      ReactDOM.findDOMNode(this.refs.dateActivity).value = '';
      ReactDOM.findDOMNode(this.refs.initTimeActivity).value = '';
      ReactDOM.findDOMNode(this.refs.finishTimeActivity).value = '';
      ReactDOM.findDOMNode(this.refs.capacityActivity).value = '';
      ReactDOM.findDOMNode(this.refs.priceActivity).value = '';
      ReactDOM.findDOMNode(this.refs.hashtagActivity).value = '';

      this.setState({
        finished: true,
      });
    }
    
  }

  renderErrorMessage(){
    let errorMessage = this.state.errorMessage;

    if(errorMessage !== ''){
      return (<div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>);
    }

    return;
  }

  render() {

    let finished = this.state.finished;
    if(finished){
      return (
        <div>
          <Navbar/>
          <br/>
          <br/>

          <div className="container detail-container">
            <h3>Actividad Creada Exitosamente</h3>
            <br/>
            <br/>
            <h5><a href="/">Regresar a la lista de actividades.</a></h5>
          </div>

        </div>
      );
    }

    return (
      <div>
        <Navbar/>
        <br/>
        <br/>
        <div id="contenedorNuevaAct" className="container form-container">
          <div className="row">
            <div className="col-7">
              <div className="form-title">
                <h3 className="letraBonita">Crea una nueva actividad: </h3>
              </div>
              <form className="new-question" onSubmit={this.handleSubmit.bind(this)}>
                <label className="letraBonita">Titulo: </label>
                <br/>
                <input
                  className="letraBonita form-control"
                  type="text"
                  ref="titleActivity"
                  placeholder="Titulo de tu actividad"
                  size="70"
                  required
                />
                <br/>
                <label className="letraBonita">Lugar: </label>
                <br/>
                <input
                  className="letraBonita form-control"
                  type="text"
                  ref="placeActivity"
                  placeholder="Lugar de la actividad"
                  size="70"
                  required
                />
                <br/>
                <label className="letraBonita">Fecha: </label>
                <br/>
                <input
                  className="letraBonita form-control"
                  type="date"
                  ref="dateActivity"
                  size="70"
                  required
                />
                <br/>
                <label className="letraBonita">Hora Inicio: </label>
                <br/>
                <input
                  className="letraBonita form-control"
                  type="time"
                  ref="initTimeActivity"
                  size="70"
                  required
                />
                <br/>
                <label className="letraBonita">Hora Fin: </label>
                <br/>
                <input
                  className="letraBonita form-control"
                  type="time"
                  ref="finishTimeActivity"
                  size="70"
                  required
                />
                <br/>
                <label className="letraBonita">Capacidad: </label>
                <br/>
                <input
                  className="form-control"
                  type="number"
                  ref="capacityActivity"
                  placeholder="Capacidad de la actividad"
                  size="30"
                  min="0"
                  required
                />
                <br/>
                  <label className="letraBonita">Hashtag Twitter: </label>
                  <br/>
                  <input
                      className="form-control"
                      type="text"
                      ref="hashtagActivity"
                      placeholder="Hashtag para ver actividades en twitter"
                      size="70"
                      required
                  />
                  <br/>
                <label className="letraBonita">Precio: </label>
                <br/>
                <input
                  className="form-control"
                  type="number"
                  ref="priceActivity"
                  placeholder="Precio de la actividad"
                  size="30"
                  min="0"
                  required
                />
                <br/>
                <br/>
                {this.renderErrorMessage()}
                <button type="submit" className="letraBonita btn btn-light btn-form">
                  Publicar
                </button>
              </form>

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
  };
})(NewActivity);