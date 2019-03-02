import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem } from 'reactstrap';
import defaultRedditImg from '../../images/reddit-logo.png';

class SubredditListItem extends Component {
    selectSubreddit = (subreddit) => {
        this.props.dispatch({
            type: 'SET_SELECTED_SUBREDDIT', 
            payload: subreddit
        });
    }

    render() {
        const {selectedSubreddit, name, key, img} = this.props;
        
        // If current <li> is active, add active class
        const className = `sub-li ${selectedSubreddit === name ? 'active' : null}`;

        return (
            <ListGroupItem 
                onClick={() => this.selectSubreddit(name)} 
                className={className}
                key={key}
            >

                <img 
                    src={img ? img : defaultRedditImg} 
                    alt={name} 
                /> 

                {'/r/' + name}

            </ListGroupItem>
        );
    }
}

function mapStateToProps(state) {
  return {
    selectedSubreddit: state.selectedSubreddit,
    subredditList: state.subredditList
  };
}

export default connect(mapStateToProps)(SubredditListItem);