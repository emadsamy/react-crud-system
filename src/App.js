// import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './views/UserAccount/Login';
import Register from './views/UserAccount/Register';
import Logout from './views/UserAccount/Logout';
import Home from './views/Home';
import Profile from './views/Profile';
import ViewProfile from './views/ViewProfile';
// import axios from 'axios';

class App extends Component {
    render() {
      return (
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route path="/view_profile/:id" component={ViewProfile} />
          {/* <Route component={PageNotFound} /> */}
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    authType: state.authType 
  }
}


export default connect(mapStateToProps)(App);
