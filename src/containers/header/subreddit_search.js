import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

class SubredditSearch extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    dropdownOpen: false
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleClick = (e) => {
    this.props.dispatch({
      type: 'SET_SORT_ORDER', 
      payload: e.currentTarget.textContent
    });
  }

  render() {
    return (
      <div className='text-center'>
        <span>Sort Type:</span>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.props.postSortOrder}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.handleClick}>Hot</DropdownItem>
            <DropdownItem onClick={this.handleClick}>New</DropdownItem>
            <DropdownItem onClick={this.handleClick}>Rising</DropdownItem>
            <DropdownItem onClick={this.handleClick}>Controversial</DropdownItem>
            <DropdownItem onClick={this.handleClick}>Top</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

// Data pulled from redux state gets picked here.
// Object keys are now props! AY-YO!
function mapStateToProps(state) {
    return {
      selectedRedditPosts: state.selectedRedditPosts,
      postSortOrder: state.postSortOrder
    };
  }
  
export default connect(mapStateToProps)(SubredditSearch);