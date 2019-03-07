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

  setSortOrder = (e) => {
    this.props.dispatch({
      type: 'SET_SORT_ORDER', 
      payload: e.currentTarget.textContent
    });
  }

  render() {
    const {postSortOrder} = this.props;
    return (
      <>
        <p className='text-center'>Sort Type:</p>
        <Dropdown className='text-center' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {postSortOrder}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.setSortOrder}>Hot</DropdownItem>
            <DropdownItem onClick={this.setSortOrder}>New</DropdownItem>
            <DropdownItem onClick={this.setSortOrder}>Rising</DropdownItem>
            <DropdownItem onClick={this.setSortOrder}>Controversial</DropdownItem>
            <DropdownItem onClick={this.setSortOrder}>Top</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </>
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