import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import SortDropdown from './sort-dropdown';

class Header extends Component {
  getPostTitle = (selectedPosts) => {
    if(selectedPosts[0].title) {
      return selectedPosts[0].title;
    }
  }

  getPostSubreddit = (selectedPosts) => {
    
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