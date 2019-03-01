import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import SubredditList from './containers/subreddit_list';

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col sm="4">
            <h3 className='text-center'>Selected Post</h3>
          </Col>
          <Col sm="4">
            <h3 className='text-center'>Subreddit Posts</h3>
          </Col>
          
          <SubredditList />
        </Row>
      </Container>
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