import React, { Component } from 'react';
import './index.css';

class TextBox extends Component {
  render() {
    return (
      <input type="text" className={this.props.className + " myInput"} placeholder={this.props.placeholder} onChange={this.props.onChange} value={this.props.value}/>
    );
  }
}

export default TextBox;
