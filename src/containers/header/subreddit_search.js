import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';

class SubredditSearch extends React.Component {


  handleChange = (e) => {
    console.log(e.target.value)
    this.props.dispatch({
      type: 'SET_SUBREDDIT_SEARCH_TEXT', 
      payload: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'SET_SELECTED_SUBREDDIT', 
      payload: this.props.subredditSearchText
    });
  }

  render() {
    return (
      <div className='text-center'>
        <span>Subreddit Search:</span>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup className='sub-input-center'>
            <Input onChange={this.handleChange} value={this.props.subredditSearchText} type="text" placeholder="RocketLeague" />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

// Data pulled from redux state gets picked here.
// Object keys are now props! AY-YO!
function mapStateToProps(state) {
    return {
      selectedRedditPosts: state.selectedRedditPosts,
      postSortOrder: state.postSortOrder,
      subredditSearchText: state.subredditSearchText
    };
  }
  
export default connect(mapStateToProps)(SubredditSearch);