import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Hello {this.props.count}</h1>
      </div>
    );
  }
}

// Data pulled from redux state gets picked here.
// Object keys are now props! AY-YO!
function mapStateToProps(state) {
  return {
    count: state.count
  };
}

// Pulls out the Redux state it through function above.
export default connect(mapStateToProps)(App);