import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

class HistoryNav extends Component {
  previousPost = () => {
    this.props.dispatch({
      type: 'SHOW_PREV_POST'
    });
  }

  nextPost = () => {
    this.props.dispatch({
      type: 'SHOW_NEXT_POST'
    });
  }

  render() {
    const {redditPosts, activeSelectedPost} = this.props;

    return (
      <Row>
        <Col sm='6'>
          {activeSelectedPost < redditPosts.length - 1 ? 
          <span className='nav-btns' onClick={this.previousPost}>&lsaquo; Previous</span> : '' }
        </Col>
        <Col sm='6' className='text-right'>
          {activeSelectedPost !== 0 ? <span className='nav-btns' onClick={this.nextPost}>Next &rsaquo;</span> : '' }
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    redditPosts: state.redditPosts,
    activeSelectedPost: state.activeSelectedPost
  };
}

export default connect(mapStateToProps)(HistoryNav);