import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import SortDropdown from './sort-dropdown';
import SubredditSearch from './subreddit_search';
import HistoryNav from './history-nav';

class Header extends Component {

  render() {
    const {selectedRedditPosts, activeSelectedPost} = this.props;

    return (
      <Row className='header-bar'>
        <Col sm='5'>
          <span className='header-title'>{selectedRedditPosts.length > 0 ? `/r/${selectedRedditPosts[activeSelectedPost].subreddit} - ${selectedRedditPosts[activeSelectedPost].title}`: ''}</span>

          <HistoryNav />
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
    selectedRedditPosts: state.selectedRedditPosts,
    activeSelectedPost: state.activeSelectedPost
  };
}

export default connect(mapStateToProps)(Header);