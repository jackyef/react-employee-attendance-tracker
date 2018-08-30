import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Login from './Login/index';
import Home from './Home/index';
import { EmployeeIndex, EmployeeInsertForm, EmployeeUpdateForm, EmployeeDetail } from './Employee';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentTab: 0
    };
  }
  handleNavigationChange(i){
    this.setState({currentTab: i });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="App-name">Employees Attendance Tracker</span>
        </div>
        <div className="App-content">
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/employee" component={EmployeeIndex} />
          <Route exact path="/employee/add" component={EmployeeInsertForm} />
          <Route exact path="/employee/edit/:_id" component={EmployeeUpdateForm} />
          <Route exact path="/employee/detail/:_id" component={EmployeeDetail} />
        </div>
        <div className="App-nav">
          {/* <Link to={`/`}>Login</Link> */}
          <div 
              className={this.state.currentTab === 1 ? "App-nav-item active" : "App-nav-item"} 
              onClick={() => this.handleNavigationChange(1)}
          >
            <Link to={`/`}>
              Welcome
            </Link>
          </div>
          <div
              className={this.state.currentTab === 2 ? "App-nav-item active" : "App-nav-item"} 
              onClick={() => this.handleNavigationChange(2)}
          >
            <Link to={`/home`}>
              Home
            </Link>
          </div>
          <div
              className={this.state.currentTab === 3 ? "App-nav-item active" : "App-nav-item"} 
              onClick={() => this.handleNavigationChange(3)}
          >
            <Link to={`/employee`}>
              Employees
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
