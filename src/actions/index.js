import {apiUrl} from "../constants.js";

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POSTS_ERROR = 'RECEIVE_POSTS_ERROR'

export const requestPosts = () => ({
  type: REQUEST_POSTS
});

export const receivePosts = (json) => {
  return {
    type: RECEIVE_POSTS,
    data: json
  };
};

export const fetchPosts = () => (dispatch) => {

  dispatch(requestPosts())
  return fetch(`${apiUrl}/`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
    .catch(dispatch({
      type: RECEIVE_POSTS_ERROR
    }));
}
