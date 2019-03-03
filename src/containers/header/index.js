import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import SortDropdown from './sort-dropdown';
import SubredditSearch from './subreddit_search'

class Header extends Component {
  getPostTitle = (selectedPosts) => {
    if(selectedPosts[0].title) {
      return selectedPosts[0].title;
    }
  }

  render() {
    const {selectedRedditPosts} = this.props;

    return (
      <Row className='header-bar'>
        <Col sm='5' className='header-title'>
          {selectedRedditPosts.length > 0 ? `/r/${selectedRedditPosts[0].subreddit} - ${selectedRedditPosts[0].title}`: ''}
        </Col>
        <Col sm='4'>
          <SortDropdown />
        </Col>
        <Col sm='3'>
          <SubredditSearch />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedSubreddit: state.selectedSubreddit,
    selectedRedditPosts: state.selectedRedditPosts
  };
}

export default connect(mapStateToProps)(Header);