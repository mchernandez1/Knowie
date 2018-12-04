import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';

import AccountsUIWrapper from './AccountsUIWrapper.js';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onChange: props.onChange
    };
  }

  render() {
    return (
      <nav className="navbar sticky-top">
        <a className="letraBonita navbar-brand nav-link hvr-icon-grow" href="/">
          <img id="imgBrand" className="hvr-icon" src="/logo.svg" alt="brand"/>
          Knowie
        </a>
        <div className="row" id="">

          {!!Meteor.user() && (Meteor.user().username === 'Deportes' || Meteor.user().username === 'Decanatura' || Meteor.user().username === 'CTP' || Meteor.user().username === 'Uniandinos' || Meteor.user().username === 'ANDAR') ? <div className="col nav-item navbar-tab">
            <Link className="nav-link hvr-underline-from-center" to="/admin">Actividades Creadas</Link>
          </div> : ''}

          {!!Meteor.user() && (Meteor.user().username === 'Deportes' || Meteor.user().username === 'Decanatura' || Meteor.user().username === 'CTP' || Meteor.user().username === 'Uniandinos' || Meteor.user().username === 'ANDAR') ? <div className="col nav-item navbar-tab">
            <Link className="nav-link hvr-underline-from-center" to="/new">Crear Actividad</Link>
          </div> : ''}

          <div className="col nav-item navbar-tab" id="sign-in">
            <AccountsUIWrapper/>
          </div>
        </div>
      </nav>
    );
  }
}