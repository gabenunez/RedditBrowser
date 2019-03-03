import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Media } from 'reactstrap';
import TextOnlyImg from '../../images/text-only.jpg';

class SelectedPost extends Component {

  render() {
    const {selectedRedditPosts} = this.props;
    if(selectedRedditPosts.length < 1) {
      return (
        <p>Please a select a post.</p>
      )
    }

    return (
      <Row>
        <Col>
        <Media>
          <Media left href={`https://www.reddit.com${selectedRedditPosts[0].permalink}`}>
            <Media object width='100px' src={selectedRedditPosts[0].thumbnail.includes('https') ? selectedRedditPosts[0].thumbnail : TextOnlyImg} alt="Generic placeholder image" />
          </Media>
          <Media body>
            <Media heading>
              {selectedRedditPosts[0].title}
            </Media>
            {selectedRedditPosts[0].selftext}
          </Media>
        </Media>
          {selectedRedditPosts.length > 0 ? selectedRedditPosts.length : ''}
        </Col>
      </Row>
    );
  }
}

// Data pulled from redux state gets picked here.
// Object keys are now props! AY-YO!
function mapStateToProps(state) {
  return {
    selectedRedditPosts: state.selectedRedditPosts
  };
}
export default connect(mapStateToProps)(SelectedPost);