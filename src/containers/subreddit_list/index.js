import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem } from 'reactstrap';
import SubRedditListItem from './list_item';
import axios from 'axios';

class SubRedditList extends Component {

  state = {
    autoCompleteAvailable: true
  }

  componentDidMount() {
    // Set initial state of subreddits
    this.getMostPopularSubs();
  }

  // Re-trigger data fetch for subreddit search text changes.
  // As long as there's text, re-render with new autocomplete listings. 
  componentDidUpdate(prevProps) {
    if (this.props.subredditSearchText !== prevProps.subredditSearchText ) {
      this.props.subredditSearchText.length > 0 ? this.autoComplete() : this.getMostPopularSubs()
    }
  }

  // Get default results
  getMostPopularSubs = () => {
    this.props.dispatch({
      type: 'SET_SUBREDDIT_LIST', 
      payload: null
    });

    axios.get('https://www.reddit.com/subreddits/popular.json')
    .then((response) => {
      this.props.dispatch({
        type: 'SET_SUBREDDIT_LIST', 
        payload: response.data.data.children
      });
    })
    .catch((error) => {
      // handle error
      console.log(error.response);
    })
  }

  // Create generate list items for the listing :)
  createSubListItems = () => {
    return (
      this.props.subredditList.map((e) => {
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

  // Autocomplete functionality
  autoComplete = () => {
    // Reset always back to available to clear warning
    this.setState({
      autoCompleteAvailable: true
    })

    // Set to loading state
    this.props.dispatch({
      type: 'SET_SUBREDDIT_LIST', 
      payload: null
    });
    
    // Get that search on each key stroke.
    // NOTE: Pretty sure it's because of the api...
    // but some subreddits simply won't show... like /r/rocketleague :(
    axios.get(`https://www.reddit.com/subreddits/search.json?q=${this.props.subredditSearchText}`)
    .then((response) => {
      
      // Filter results to ensure user's entered text is in the sub title.
      const filiteredResponse = response.data.data.children.filter((li) => {
        if(!li.data.display_name.includes(this.props.subredditSearchText)) {
          return false;
        }
        return true;
      });

      // If we're left with 0 results after filtering, say nah man, 
      // there's no subreddit.
      if(filiteredResponse.length < 1) {
        this.setState({
          autoCompleteAvailable: false
        })
      }

      this.props.dispatch({
        type: 'SET_SUBREDDIT_LIST', 
        payload: filiteredResponse
      });
    })
    .catch((error) => {
      // error
      console.log(error);
    })
  }

  render() {
    if(!this.state.autoCompleteAvailable) {
      return (
        <ListGroupItem>Sorry, no subreddit under that name.</ListGroupItem>
      )
    }
    return (   
      this.props.subredditList ? 
      this.createSubListItems() :
      <ListGroupItem>Loading... Please wait.</ListGroupItem>
    );
  }
}

// Data pulled from redux state gets picked here.
// Object keys are now props! AY-YO!
function mapStateToProps(state) {
  return {
    subredditSearchText: state.subredditSearchText,
    subredditList: state.subredditList
  };
}
export default connect(mapStateToProps)(SubRedditList);