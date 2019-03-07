import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Media } from 'reactstrap';
import TextOnlyImg from '../../images/text-only.jpg';
import Markdown from 'markdown-to-jsx';

class SelectedPost extends Component {

  // Check thumbnail, if thumbnail contains http, assume
  // it has an image, otherwise, return text-only image.
  checkForThumbnail = (thumbnail) => {
    if (thumbnail.includes('http')) {
      return thumbnail;
    }

    return TextOnlyImg;
  }

  render() {
    const {redditPosts, activeSelectedPost} = this.props;

    if(redditPosts.length < 1) {
      return (
        <p className='text-center'>Please a select a post.</p>
      )
    }

    const {permalink, title, author, selftext, thumbnail} = redditPosts[activeSelectedPost];

    return (
      <Row>
        <Col>
        <Media>
          <Media left href={`https://www.reddit.com${permalink}`}>
            
            <Media 
              object 
              className='post-thumbnail' 
              src={this.checkForThumbnail(thumbnail)} alt={title} 
            />
            
          </Media>
          <Media body>
            <Media heading>
              {title}
            </Media>
            <Media heading>
              <small>Posted by: {author}</small>
            </Media>
            {selftext ? <Markdown>{selftext}</Markdown> : ''}
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
    redditPosts: state.redditPosts,
    activeSelectedPost: state.activeSelectedPost
  };
}

export default connect(mapStateToProps)(SelectedPost);