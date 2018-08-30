import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import { BarLoader } from 'react-spinners';
import DatePicker from './../common/DatePicker';
import Button from './../common/Button';
import TextBox from './../common/TextBox';

import './index.css';

class EmployeeUpdateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      _id: this.props.match.params._id,
      name: "",
      department: "",
      origin: "",
      loading: true,
      joinDate: moment(new Date()).format("YYYY-MM-DD"),
    };
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this); 
    this.handleNameChange = this.handleNameChange.bind(this); 
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this); 
    this.handleOriginChange = this.handleOriginChange.bind(this); 
    this.submitForm = this.submitForm.bind(this); 
  }

  componentWillMount(){
    axios.get("/api/employee/"+this.state._id)
    .then(
      (res) => {    
        var newState = {
          name: res.data.name,
          department: res.data.department,
          origin: res.data.origin,
          joinDate: res.data.joinDate,
        }
        this.setState( newState );
        this.setState( { loading: false } );
      }, 
      (err) => {
        alert('An error occured! Try refreshing the page.', err);
      }
    );
  }

  handleDatePickerChange(date){
    this.setState({ joinDate: moment(date).format("YYYY-MM-DD") });
  }
  handleNameChange(event){
    this.setState({ name: event.target.value });
  }
  handleDepartmentChange(event){
    this.setState({ department: event.target.value });
  }
  handleOriginChange(event){
    this.setState({ origin: event.target.value });
  }

  submitForm(){
    var { _id, name, department, origin, joinDate } = this.state;
    var employee = {
      _id, name, department, origin, joinDate
    };
    axios.post('/api/employee/update', employee)
    .then(
      (res) => {
        alert('Updated successfully!');
      },
      (err) => {
        alert('An error occured! Try submitting the form again.', err);
      }
    );
  }
  renderForm(){
    if(!this.state.loading){
      return (
        <div className="form-container">
          <div className="form">
            Name <br/>
            <TextBox 
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="Ex: Budi Budianto Budiantoro, etc"/> <br/>
            
            Unit <br/>
            <TextBox
              value={this.state.department}
              onChange={this.handleDepartmentChange}
              placeholder="Ex: Technology, Product, Marketing, etc"/> <br/>
            
            Origin <br/>
            <TextBox 
              value={this.state.origin}
              onChange={this.handleOriginChange} 
              placeholder="Ex: Jakarta, Pekanbaru, Medan, etc"/> <br/>

            <div className="date-picker-container">
              Joined on
              <DatePicker
                className="flex"
                value={this.state.joinDate}
                placeholderText="Click to select a date" 
                onChange={this.handleDatePickerChange} />
            </div>

            <br/>

            <Button onClick={this.submitForm} className="btn btn-success">Save changes</Button>

          </div>

        </div>
      );
    }
  }
  render() {
    return (
      <div className="container">
        <div className="heading">
          Update employee information
        </div>
        <div className="loader-container">
          <BarLoader
            color={'#444'} 
            loading={this.state.loading} 
          />
        </div>
        {this.renderForm()}
      </div>
    );
  }
}

export default EmployeeUpdateForm;