import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem } from 'reactstrap';
import SubRedditListItem from './list_item';
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
    return (
      subredditList.map((e) => {
        const {id, icon_img, display_name} = e.data;

        return (
            <SubRedditListItem 
              key={id} 
              img={icon_img} 
              name={display_name}
            />
          );
        }
      )
    )
  }

  render() {
    return (   
      this.props.subredditList ? 
      this.createSubListItems(this.props.subredditList) :
      <ListGroupItem>Loading... Please wait.</ListGroupItem>
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