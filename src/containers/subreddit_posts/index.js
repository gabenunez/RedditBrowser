import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem } from 'reactstrap';
import axios from 'axios';

class SubRedditPosts extends Component {
  // Trigger fetching of data immediately if component mounts.
  componentDidMount() {
    this.fetchSubredditPosts();
  }

  // Re-trigger data fetch if selected subreddit changes.
  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      this.fetchSubredditPosts();
    }
  }

  // Fetch subreddit posts and send em' to Redux
  fetchSubredditPosts() {
    
    // Trigger "loading" status
    if(this.props.selectedSubreddit) {
      this.props.dispatch({
        type: 'SET_SUBREDDIT_POSTS', 
        payload: null
      }) 
    }

    axios.get(`https://www.reddit.com/r/${this.props.selectedSubreddit}/hot.json`)
    .then((response) => {
      this.props.dispatch({
        type: 'SET_SUBREDDIT_POSTS', 
        payload: response.data.data.children
      })
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
  }

  setSelectedPost(e) {
    // Add clicked post to a "playlist"... thing :)
    this.props.dispatch({
      type: 'ADD_SUBREDDIT_POST', 
      payload: e.data
    });
  }

  // Check if group <li> is active using IDs
  checkIfActive = (selectedRedditPosts, uniqueID) => {
    if (selectedRedditPosts.length > 0 && selectedRedditPosts[0].id === uniqueID) {
      return 'active';
    }
  }

  render() {
    const {subredditPosts, selectedRedditPosts} = this.props;
    if(!subredditPosts) {
      return (
        <ListGroupItem>
          Please wait... loading posts.
        </ListGroupItem>
      )
    }
    return (
      this.props.subredditPosts.map((e) => {
        const {title, id} = e.data;

        return (
          <ListGroupItem key={id} onClick={() => this.setSelectedPost(e)} className={this.checkIfActive(selectedRedditPosts, id)}>
            {title}
          </ListGroupItem>
          );
        }
      )
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedSubreddit: state.selectedSubreddit,
    subredditPosts: state.subredditPosts,
    selectedRedditPosts: state.selectedRedditPosts
  };
}

export default connect(mapStateToProps)(SubRedditPosts);