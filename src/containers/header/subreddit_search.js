import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';

class SubredditSearch extends React.Component {
  updateSubSearch = (e) => {
    this.props.dispatch({
      type: 'SET_SUBREDDIT_SEARCH_TEXT', 
      payload: e.target.value
    });
  }

  setSubreddit = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'SET_SELECTED_SUBREDDIT', 
      payload: this.props.subredditSearchText
    });
  }

  render() {
    const {subredditSearchText} = this.props;
    return (
      <>
        <p className='text-center'>Subreddit Search:</p>
        <Form inline onSubmit={this.setSubreddit}>
          <FormGroup className='sub-input-center'>
            <Input onChange={this.updateSubSearch} value={subredditSearchText} type="text" placeholder="Google" />
          </FormGroup>
        </Form>
      </>
    );
  }
}

// Data pulled from redux state gets picked here.
// Object keys are now props! AY-YO!
function mapStateToProps(state) {
    return {
      redditPosts: state.redditPosts,
      postSortOrder: state.postSortOrder,
      subredditSearchText: state.subredditSearchText
    };
  }
  
export default connect(mapStateToProps)(SubredditSearch);