import {
  REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_POSTS_ERROR
} from '../actions'


const posts = (state = {
  isFetching: false,
  posts: [],
  iconUrl: ""
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        isError: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        posts: action.data.insurances,
        iconUrl:action.data.embedded.logo.href,
        isError: false
      }

    case RECEIVE_POSTS_ERROR:
      return {
        ...state,
        isFetching: false
      }

    default:
      return state
  }
}

export default posts
