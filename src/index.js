import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Initial application state
const initialState = {
    subredditList: null,
    subredditSearchText: '',
    selectedSubreddit: null,
    subredditPosts: null,
    selectedRedditPosts: [],
    postSortOrder: 'Hot',
    activeSelectedPost: 0
};

// Reducers should always return something :)
// State: Current State
function reducer(state = initialState, action) {
    // For testing purposes, log all payloads
    console.log(action.payload);

    switch(action.type) {
      case 'SET_SUBREDDIT_LIST':
        return {
          ...state,
          subredditList: action.payload
        }
      case 'SET_SORT_ORDER':
        return {
          ...state,
          postSortOrder: action.payload
        }
      case 'SET_SUBREDDIT_SEARCH_TEXT':
        return {
          ...state,
          subredditSearchText: action.payload
        }
      case 'SET_SELECTED_SUBREDDIT':
        return {
          ...state,
          selectedSubreddit: action.payload
        }
      case 'SET_SELECTED_POST':
        return {
          ...state,
          selectedSubredditPost: action.payload
        }
      case 'SET_SUBREDDIT_POSTS':
        return {
          ...state,
          subredditPosts: action.payload
        }
      case 'ADD_SUBREDDIT_POST':
        return {
          ...state,
          selectedRedditPosts: [action.payload, ...state.selectedRedditPosts]
        }
      case 'RESET_SUBREDDIT_POST':
        return {
          ...state,
          selectedRedditPosts: [action.payload]
        }
      case 'SET_ACTIVE_POST':
        return {
          ...state,
          activeSelectedPost: action.payload
        }
      case 'SHOW_PREV_POST':
        return {
          ...state,
          activeSelectedPost: state.activeSelectedPost + 1
        }
      case 'SHOW_NEXT_POST':
        return {
        ...state,
        activeSelectedPost: state.activeSelectedPost - 1
      }

      default:
        return state;
    }
}

// Create that redux store (the whole point we use redux)
const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
