// Initial application state
const initialState = {
    subredditList: null,
    subredditSearchText: '',
    selectedSubreddit: null,
    subredditPosts: null,
    redditPosts: [],
    postSortOrder: 'Hot',
    activePostIndex: 0
};

// Reducers should always return something :)
// State: Current State
const reducer = (state = initialState, action) => {
  
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
          redditPosts: [action.payload, ...state.redditPosts]
        }
      case 'RESET_SUBREDDIT_POST':
        return {
          ...state,
          redditPosts: [action.payload]
        }
      case 'SET_ACTIVE_POST':
        return {
          ...state,
          activePostIndex: action.payload
        }
      case 'SHOW_PREV_POST':
        return {
          ...state,
          activePostIndex: state.activePostIndex + 1
        }
      case 'SHOW_NEXT_POST':
        return {
        ...state,
        activePostIndex: state.activePostIndex - 1
      }

      default:
        return state;
    }
}

export default reducer;