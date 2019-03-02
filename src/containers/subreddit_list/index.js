import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';

class SubRedditList extends Component {
  componentDidMount() {
    // Set initial state of subreddits

    axios.get('https://www.reddit.com/subreddits/popular.json')
      .then((response) => {
        this.props.dispatch({
          type: 'SET_SUBREDDIT_LIST', 
          payload: response.data.data.children
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  // Create generate list items for the listing :)
  createSubListItems = (subredditList) => {
    console.log(subredditList);
    return (
      subredditList.map(e => {
        return (
            <ListGroupItem className='sub-li' key={e.data.id}>
              {e.data.icon_img ?
                <img 
                  src={e.data.icon_img} 
                  alt={e.data.display_name_prefixed} 
                /> : null}
              {'/' + e.data.display_name_prefixed}
            </ListGroupItem>
          );
        }
      )
    )
  }

  render() {
    return (
      <Col sm="4">
        <h3 className='text-center'>Subreddits</h3>
        <ListGroup>
          {
            this.props.subredditList ? 
            this.createSubListItems(this.props.subredditList) :
            <ListGroupItem>Loading... Please wait.</ListGroupItem>
          }
        </ListGroup>
      </Col>
    );
  }
}

// Data pulled from redux state gets picked here.
// Object keys are now props! AY-YO!
function mapStateToProps(state) {
  return {
    subredditList: state.subredditList
  };
}
export default connect(mapStateToProps)(SubRedditList);