import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Media } from 'reactstrap';
import TextOnlyImg from '../../images/text-only.jpg';
import Markdown from 'markdown-to-jsx';

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
            
            {/* If thumbnail contains http, assume it has an image */}
            <Media object width='100px' className='post-thumbnail' src={selectedRedditPosts[0].thumbnail.includes('http') ? selectedRedditPosts[0].thumbnail : TextOnlyImg} alt={selectedRedditPosts[0].title} />
            
          </Media>
          <Media body>
            <Media heading>
              {selectedRedditPosts[0].title}
            </Media>
            {selectedRedditPosts[0].selftext ? <Markdown>{selectedRedditPosts[0].selftext}</Markdown> : ''}
          </Media>
        </Media>
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