import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import SortDropdown from './sort-dropdown';
import SubredditSearch from './subreddit_search';
import HistoryNav from './history-nav';

class Header extends Component {

  render() {
    const {redditPosts, activeSelectedPost} = this.props;

    return (
      <Row className='header-bar'>
        <Col sm='5'>
          <span className='header-title'>{redditPosts.length > 0 ? `/r/${redditPosts[activeSelectedPost].subreddit} - ${redditPosts[activeSelectedPost].title}`: ''}</span>

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
    redditPosts: state.redditPosts,
    activeSelectedPost: state.activeSelectedPost
  };
}

export default connect(mapStateToProps)(Header);