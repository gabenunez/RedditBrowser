import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import Header from './containers/header';
import SubredditList from './containers/subreddit_list';
import SubredditPosts from './containers/subreddit_posts';
import SelectedPost from './containers/selected_post';

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Header />
        <Row>
          <Col sm="5">
            <h3 className='text-center'>Selected Post</h3>
            <SelectedPost />
          </Col>

          {/* 
            Renders subreddit posts if there's a selected subreddit.

            NOTE: Kept this way for now to render "loading" text 
            if the the selectedSubreddit is null.
          */}
          <Col sm="4">
            <h3 className='text-center'>Subreddit Posts</h3>
            <ListGroup>
            {this.props.selectedSubreddit ? 
              <SubredditPosts /> : <ListGroupItem className='text-center'>Please select a subreddit.</ListGroupItem>
            }
            </ListGroup>
          </Col>
          
          {/* Renders list of subreddits available */}
          <Col sm="3">
            <h3 className='text-center'>Subreddits</h3>
            <ListGroup>
              <SubredditList />
            </ListGroup>
          </Col>

        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedSubreddit: state.selectedSubreddit,
    subredditPosts: state.subredditPosts
  };
}

export default connect(mapStateToProps)(App);