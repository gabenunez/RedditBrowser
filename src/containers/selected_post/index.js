import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Media } from 'reactstrap';
import TextOnlyImg from '../../images/text-only.jpg';
import Markdown from 'markdown-to-jsx';

class SelectedPost extends Component {

  // Check thumbnail, if thumbnail contains http, assume
  // it has an image, otherwise, return text-only image.
  checkForThumbnail = (post) => {
    if (post.thumbnail.includes('http')) {
      return post.thumbnail;
    }

    return TextOnlyImg;
  }

  render() {
    const {selectedRedditPosts, activeSelectedPost} = this.props;
    if(selectedRedditPosts.length < 1) {
      return (
        <p>Please a select a post.</p>
      )
    }

    return (
      <Row>
        <Col>
        <Media>
          <Media left href={`https://www.reddit.com${selectedRedditPosts[activeSelectedPost].permalink}`}>
            
            <Media 
              object 
              className='post-thumbnail' 
              src={this.checkForThumbnail(selectedRedditPosts[activeSelectedPost])} alt={selectedRedditPosts[activeSelectedPost].title} />
            
          </Media>
          <Media body>
            <Media heading>
              {selectedRedditPosts[activeSelectedPost].title}
            </Media>
            <Media heading>
              <small>Posted by: {selectedRedditPosts[activeSelectedPost].author}</small>
            </Media>
            {selectedRedditPosts[activeSelectedPost].selftext ? <Markdown>{selectedRedditPosts[activeSelectedPost].selftext}</Markdown> : ''}
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
    selectedRedditPosts: state.selectedRedditPosts,
    activeSelectedPost: state.activeSelectedPost
  };
}
export default connect(mapStateToProps)(SelectedPost);