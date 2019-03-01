import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, ListGroup, ListGroupItem } from 'reactstrap';

class SubRedditList extends Component {
  render() {
    return (
      <Col sm="4">
        <h3 className='text-center'>Subreddits</h3>

        <ListGroup>
          <ListGroupItem>
            HI
          </ListGroupItem>
        </ListGroup>
      </Col>
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
export default connect(mapStateToProps)(SubRedditList);