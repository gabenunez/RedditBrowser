import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem } from 'reactstrap';
import axios from 'axios';

class SubRedditPosts extends Component {
  state = {
    fetchError: null
  }

  // Re-trigger data fetch if selected subreddit or sort changes.
  componentDidUpdate(prevProps) {
    const {selectedSubreddit, postSortOrder} = this.props;
    if (selectedSubreddit !== prevProps.selectedSubreddit || postSortOrder !== prevProps.postSortOrder) {
      this.fetchSubredditPosts();
    }
  }

  // Fetch subreddit posts and send em' to Redux
  fetchSubredditPosts() {
    const {selectedSubreddit, dispatch, postSortOrder} = this.props;

    this.setState({
      fetchError: null
    })

    // Trigger "loading" status
    if(selectedSubreddit) {
      dispatch({
        type: 'SET_SUBREDDIT_POSTS', 
        payload: null
      }) 
    }

    axios.get(`https://www.reddit.com/r/${selectedSubreddit}/${postSortOrder.toLowerCase()}.json`)
    .then((response) => {
      dispatch({
        type: 'SET_SUBREDDIT_POSTS', 
        payload: response.data.data.children
      })
    })
    .catch((error) => {
      // NOTE: Very general error
      // Any errors result in the following msg.
      this.setState({
        fetchError: 'Error getting data... try a different subreddit?'
      })
      console.log(error);
    })
  }

  // Add clicked post to a "playlist"... thing :)
  setSelectedPost = (e) => {
    const {selectedRedditPosts, dispatch} = this.props;

    if(selectedRedditPosts[0]) {
      // If subreddits match, just add
      if(e.data.subreddit === selectedRedditPosts[0].subreddit) {
        dispatch({
          type: 'ADD_SUBREDDIT_POST', 
          payload: e.data
        });
      
      // If subreddits don't, clear and add
      } else {
        dispatch({
          type: 'SET_ACTIVE_POST', 
          payload: 0
        });
        
        dispatch({
          type: 'RESET_SUBREDDIT_POST', 
          payload: e.data
        });
      }
    
    // If array is empty, add it :)
    } else if(selectedRedditPosts.length === 0) {
      dispatch({
        type: 'ADD_SUBREDDIT_POST', 
        payload: e.data
      });
    }
  }

  // Check if group <li> is active using IDs
  checkIfActive = (selectedRedditPosts, uniqueID) => {
    const {activeSelectedPost} = this.props;
    if (selectedRedditPosts.length > 0 && selectedRedditPosts[activeSelectedPost].id === uniqueID) {
      return 'active';
    }
  }

  // Creates listgroup item
  createGroupItem = (text) => {
    return <ListGroupItem>{text}</ListGroupItem>
  }

  render() {
    const {subredditPosts, selectedRedditPosts, selectedSubreddit} = this.props;
    const {fetchError} = this.state;
    
    if(!selectedSubreddit) {
      return this.createGroupItem('Please select a subreddit.');
    }

    if(fetchError) {
      return this.createGroupItem(fetchError);
    }

    if(!subredditPosts) {
      return this.createGroupItem('Please wait... loading posts.');
    }

    return (
      subredditPosts.map((e) => {
        const {title, id} = e.data;

        return (
          <ListGroupItem 
            key={id} 
            onClick={() => this.setSelectedPost(e)} 
            className={this.checkIfActive(selectedRedditPosts, id)}
          >
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
    selectedRedditPosts: state.selectedRedditPosts,
    postSortOrder: state.postSortOrder,
    activeSelectedPost: state.activeSelectedPost
  };
}

export default connect(mapStateToProps)(SubRedditPosts);