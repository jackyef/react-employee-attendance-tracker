import React, { Component } from 'react';
import './index.css';

class Login extends Component {
  render() {
    
    var legends = {
      "Present": <div className="legends-inline bg-success">present</div>,         
      "Sick": <div className="legends-inline bg-warning">sick</div>,
      "Vacation": <div className="legends-inline bg-info">vacation</div>,
      "Absent": <div className="legends-inline bg-danger">absent</div>
    };

    return (
      <div className="container">
        <div className="heading">
          
        </div>
        <div className="Login-content">
          <div className="Login-card">
            <div className="Login-card-row text-align-center">
              Welcome to this simple Employees Attendance Tracker web-app developed using React!
            </div>
          </div>
          <div className="Login-card">
            <div className="Login-card-row">
              This is NOT a full-featured Employee Attendance Tracker. Some notable points:
              <ul className="Login-card-list">
                <li>There are no logins as of now, just use the app right away!</li>
                <li>The app currently does not log check-in and check-out time</li> 
                <li>The codebase probably needs to be refactored</li> 
              </ul>
              Because the project has a 3 days deadline, I only included some main features.
            </div>
          </div>
          
          <div className="Login-card">
            <div className="Login-card-row">
              Features:
            </div>
            <div className="Login-card-separator"/>
            <div className="Login-card-row">
              <ul className="Login-card-list">
                <li>CRUD operations on employees data </li>
                <li>Marking employee as {legends.Present}, {legends.Sick}, {legends.Vacation}, or {legends.Absent}</li>
                <li>Shows employee statistics for the past 30 and 365 days </li>
                <li>Displays a graph of employee stats for the past 12 months </li>
                <li>Fully responsive design to fit every screen-size (try rotating your device!) </li>
                <li>Backed by ExpressJS and MongoDB (hosted on mLab) </li>
                <li>Employees data scrapped from Tokopedia team page (the Nakamas!) </li>
              </ul>
            </div>
          </div>

          <div className="Login-card">
            <div className="Login-card-row justify-space-between">
              <div>
                Built with React + &lt;3
              </div>
              <div>
                by <a rel="noopener noreferrer" target="_blank" href="https://github.com/jackyef/react-employee-attendance-tracker">Jacky Efendi</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Login;
