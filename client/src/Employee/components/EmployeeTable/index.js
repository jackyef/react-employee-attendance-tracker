import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { Table, Column, Cell } from 'fixed-data-table';
import { BarLoader } from 'react-spinners';
import moment from 'moment';

import Button from './../../../common/Button/index.js';
import TextBox from './../../../common/TextBox';
import './index.css';

class EmployeeTable extends Component {
  constructor(props){
    super(props);

    this.state = {
      nameFilter: "",
      data: [],
      currentPage: 1,
      totalPage: 1,
      limitPage: 10,
      shownCount: 0,
      totalCount: 0,
      loading: true
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount(){
    // fetch data from an API here 
    if(!this.state.data.length){
      axios.get("/api/employee/all")
      .then(
        (res) => {    
          this.setState( { data: res.data} );
          this.setState( { currentPage: 1 })
          this.setState( { totalPage: Math.ceil(res.data.length / this.state.limitPage) })
          this.setState( { loading: false} );
        }, 
        (err) => {
          alert('An error occured! Try refreshing the page.', err);
        }
      );
    }
  }
  
  onFilterChange(event){
    var newFilter = event.target.value.toLowerCase();
    this.setState( { nameFilter: newFilter });
    this.setState( { currentPage: 1 });
  }

  decreasePage(){
    var currentPage = this.state.currentPage;
    currentPage--;
    if(currentPage > 0){
      this.setState( { currentPage: currentPage });
    }
  }

  increasePage(){
    var currentPage = this.state.currentPage;
    currentPage++;
    if(currentPage <= this.state.totalPage){
      this.setState( { currentPage: currentPage });
    }
  }

  deleteEmployee(index){
    // delete data to API here
    axios.get("/api/employee/delete/"+this.state.data[index]._id)
    .then(
      (res) => {    
        alert('Deleted successfully!');
        var temp = this.state.data;
        temp.splice(index, 1);
        this.setState( { data: temp });
      }, 
      (err) => {
        alert('An error occured! Try again.', err);
      }
    );
  }

  renderData(){
    var filtered = [];

    filtered = this.state.data.map( (row, i) => {
      if(row.name.toLowerCase().indexOf(this.state.nameFilter) > -1){
        return (
          <tr key={"employeeData"+i}>
            <td>{i+1}</td>
            <td>{row.name}</td>
            <td>{row.department}</td>
            <td>{row.origin}</td>
            <td>{moment(row.joinDate).format("Do MMMM YYYY")}</td>
            <td>
              <Button className="btn btn-info">Edit</Button>
              <Button onClick={() => this.deleteEmployee(i)} className="btn btn-danger">Delete</Button>
            </td>
          </tr>
        );
      } else {
        return undefined;
      }
    });
    
    
    // filtered = filtered.forEach((row, i) => {
    //   var lowerBound = (this.stateCurrentPage-1) * this.state.limitPage;
    //   var upperBound = (this.stateCurrentPage) * this.state.limitPage;
    //   if(i >= lowerBound && i < upperBound) return;
    //   else row = undefined;
    // });

    filtered = filtered.filter((row) => row !== undefined);
    if(filtered.length > 0) {
      if(filtered.length > this.state.limitPage){
        var totalCount = filtered.length;
        this.setState( { totalCount: totalCount} );
        var lowerBound = (this.state.currentPage-1) * this.state.limitPage;
        var upperBound = (this.state.currentPage) * this.state.limitPage;
        console.log("getting from index", lowerBound, "to", lowerBound+this.state.limitPage);
        filtered = filtered.slice(lowerBound, upperBound);
      }
      var shownCount = filtered.length;
      this.setState( { shownCount: shownCount} );
      return filtered;
    } else {
      return (
        <tr>
          <td colSpan="6"><em>No employee found</em></td>
        </tr>
      )
    }
  }

  renderTable() {
    var totalCount = 0;
    var shownCount = 0;
    var lowerBound = 0;
    var upperBound = 0;
    var filtered = [];

    filtered = this.state.data.map( (row, i) => {
      if(row.name.toLowerCase().indexOf(this.state.nameFilter) > -1){
        return (
          <tr key={"employeeData"+i}>
            <td>{i+1}</td>
            <td>
              <Link to={"/employee/detail/" + row._id}>
                {row.name}
              </Link>
            </td>
            <td>{row.department}</td>
            <td>{row.origin}</td>
            <td>{moment(row.joinDate).format("Do MMMM YYYY")}</td>
            <td>
              <Link to={"/employee/edit/"+row._id}>
                <Button className="btn btn-info">Edit</Button>
              </Link>
              <Button onClick={() => this.deleteEmployee(i)} className="btn btn-danger">Delete</Button>
            </td>
          </tr>
        );
      } else {
        return undefined;
      }
    });
    var filteredTotalPage = this.state.totalPage;
    var filteredCurrentPage = this.state.currentPage;
    filtered = filtered.filter((row) => row !== undefined);
    totalCount = filtered.length;
    if(filtered.length > 0) {
      if(filtered.length > this.state.limitPage){
        lowerBound = (this.state.currentPage-1) * this.state.limitPage;
        upperBound = (this.state.currentPage) * this.state.limitPage;
        // console.log("getting from index", lowerBound, "to", lowerBound+this.state.limitPage);
        filtered = filtered.slice(lowerBound, upperBound);
      }
      filteredTotalPage = Math.ceil(totalCount / this.state.limitPage)
      shownCount = filtered.length;
      // return filtered;
    } else {
      filteredTotalPage = 1;
      filteredCurrentPage = 1;
      filtered = (
        <tr>
          <td colSpan="6"><em>No employee found</em></td>
        </tr>
      );
    }

    if(this.state.currentPage > filteredTotalPage) filteredCurrentPage = filteredTotalPage;

    var buttonIncrease = <Button className="btn" onClick={() => this.increasePage()}>&gt;</Button>;
    var buttonDecrease = <Button className="btn" onClick={() => this.decreasePage()}>&lt;</Button>;
    

    if(!this.state.loading)
      return (
        <div className="container">
          <div className="table-controls">
            <Link to="/employee/add">
              <Button className="btn btn-success">Add new employee</Button>
            </Link>
            <TextBox placeholder="filter by name..." onChange={this.onFilterChange} value={this.state.nameFilter}/>
          </div>
          <div className="table-pagination">
            <div className="results">
              Showing {lowerBound+1}-{shownCount ? (lowerBound+shownCount) : 1} result from {totalCount} total results
            </div>
            <div className="pagination-buttons">
              {(this.state.currentPage > 1) ? buttonDecrease : ""}
              Page {filteredCurrentPage || this.state.currentPage} of { filteredTotalPage || this.state.totalPage}
              {(this.state.currentPage < filteredTotalPage) ? buttonIncrease : ""}
            </div>
          </div>
          <table className="employee-table">
            <tbody>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Unit</th>
              <th>Origin</th>
              <th>Joined at</th>
              <th>Action</th>
            </tr>
            { filtered }
            </tbody>
          </table>
        </div>
      );
  }

  render() {
    return (
      <div className="main-container">
        <div className="loader-container">
          <BarLoader
            color={'#444'} 
            loading={this.state.loading} 
          />
        </div>
        {this.renderTable()}
      </div>
    );
  }
}

export default EmployeeTable;
