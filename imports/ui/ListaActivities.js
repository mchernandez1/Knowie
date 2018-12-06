import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Activities} from '../api/activities.js';
import Activity from './Activity.js';
import Calendar from './Calendar.js';
import FullCalendar from "fullcalendar-reactwrapper";


// App component - represents the whole app
class ListaActivities extends Component {

  constructor(props) {
    super(props);
    this.state = {
      organizadores: ["Deportes", "Decanatura", "ANDAR", "CTP", "Uniandinos"],
      filterTags: "Deportes",
      events: []
    };
  }

  organizadorFilter(organizador) {
    let filteredActivities = this.props.activities;
    filteredActivities = filteredActivities.filter((a) => a.username === organizador);
    let events = [];
    for (let i = 0; i < filteredActivities.length; i++) {
      let actual = filteredActivities[i];
      let evento = {
        title: actual.title, start: actual.date + 'T' + actual.initTime,
        end: actual.date + 'T' + actual.finishTime, url: 'activity/' + actual._id
      };
      events.push(evento)
    }
    this.setState({
      filterTags: organizador,
      events: events
    });

  }

  buscarEvento(event) {
    event.preventDefault();
    let textoBusqueda = this.textoBusqueda;
    Meteor.call('activities.busqueda', textoBusqueda.value, (error,result)=>{
      if (error) throw error;
      const events = [];
      for (let i = 0; i < result.length; i++) {
        let actual = result[i];
        let evento = {
          title: actual.title, start: actual.date + 'T' + actual.initTime,
          end: actual.date + 'T' + actual.finishTime, url: 'activity/' + actual._id
        };
        events.push(evento)
      }
      this.setState({
        events:events
      });
    });
  }

  renderOrganizadores() {
    return this.state.organizadores.map((a, i) => <div>
        {a === this.state.filterTags ?
          <button key={"s" + i} id="organizador-selected" onClick={this.organizadorFilter.bind(this, a)}>
            <p>{a}</p>
          </button> :
          <button key={"n" + i} className="container-organizadores" onClick={this.organizadorFilter.bind(this, a)}>
            <p>{a}</p>
          </button>}
      </div>
    );
  }

  render() {
    let filteredActivities = this.props.activities;
    filteredActivities = filteredActivities.filter((a) => a.username === this.state.filterTags);
    const events = [];
    for (let i = 0; i < filteredActivities.length; i++) {
      let actual = filteredActivities[i];
      let evento = {
        title: actual.title, start: actual.date + 'T' + actual.initTime,
        end: actual.date + 'T' + actual.finishTime, url: 'activity/' + actual._id
      };
      events.push(evento)
    }
    return (
      <div className="row" id="fila-actividades">
        <div className="col-3" id="sinEspacio">
          <div id="container-organizador">
            <p>Organizadores</p>
              {/*<div id="divlupa" className="col-3">*/}
                {/*<img id="lupa" src="search.svg" alt=""/>*/}
              {/*</div>*/}
              <div id="barraBusqueda">
                <form onSubmit={this.buscarEvento.bind(this)}>
                <input id="barraTextoBusqueda" type="text" placeholder="Buscar Evento"
                       ref={(ref)=>this.textoBusqueda = ref}/>
                </form>
            </div>
          </div>
          {this.renderOrganizadores()}
        </div>
        <div className="col-9" id="tamanio">
          <h1 id="nombre-institucion">Actividades Uniandes</h1>
          <div id="example-component">
            {this.state.events.length === 0 ?
              <FullCalendar
                id="KnowieCalendar"
                header={{
                  left: 'prev,next today myCustomButton',
                  center: 'title',
                  right: 'month,basicWeek,basicDay'
                }}
                defaultDate={Date().toString()}
                navLinks={true} // can click day/week names to navigate views
                editable={false}
                eventLimit={true} // allow "more" link when too many events
                events={events}
              /> : <FullCalendar
                id="KnowieCalendar"
                header={{
                  left: 'prev,next today myCustomButton',
                  center: 'title',
                  right: 'month,basicWeek,basicDay'
                }}
                defaultDate={Date().toString()}
                navLinks={true} // can click day/week names to navigate views
                editable={false}
                eventLimit={true} // allow "more" link when too many events
                events={this.state.events}
              />}
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('activities');

  return {
    activities: Activities.find({}, {sort: {date: 1}}).fetch(),
    currentUser: Meteor.user(),
  };
})(ListaActivities);