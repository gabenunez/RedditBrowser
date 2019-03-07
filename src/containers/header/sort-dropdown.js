import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

class Sort_Dropdown extends React.Component {
  state = {
    dropdownOpen: false
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  setSetOrder = (e) => {
    this.props.dispatch({
      type: 'SET_SORT_ORDER', 
      payload: e.currentTarget.textContent
    });
  }

  render() {
    const {postSortOrder} = this.props;
    return (
      <div className='text-center'>
        <span>Sort Type:</span>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {postSortOrder}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.setSetOrder}>Hot</DropdownItem>
            <DropdownItem onClick={this.setSetOrder}>New</DropdownItem>
            <DropdownItem onClick={this.setSetOrder}>Rising</DropdownItem>
            <DropdownItem onClick={this.setSetOrder}>Controversial</DropdownItem>
            <DropdownItem onClick={this.setSetOrder}>Top</DropdownItem>
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
      redditPosts: state.redditPosts,
      postSortOrder: state.postSortOrder
    };
  }
  
export default connect(mapStateToProps)(Sort_Dropdown);