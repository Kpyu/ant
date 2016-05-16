import { LOGIN } from './ActionTypes.jsx';
import request from 'axios';
import { pushState } from 'redux-react-router';

function doTypingName() {
  return { type: 'NAME_TYPING' };
}

function doLogin() {
  return { type: 'fetching' };
}

function loginSuccess(data) {
  return { type: 'success', success: data };
}

function receiveError(error) {
  return { type: 'falied', fail: error };
}





export function submit(data) {
  return LOGIN.SUBMIT_TODO;
}

export function typingName() {
  return (dispatch) => {
    dispatch(doTypingName());
  };
}

export function login() {
  return (dispatch) => {
    dispatch(doLogin());
    return request({
      url: '/dologin',
      timeout: 20000,
      method: 'post',
      responseType: 'json'
    }).
      then(function (response) {
        dispatch(loginSuccess(response.data));
      })
      .catch(function (response) {
        dispatch(receiveError(response.data));
      });
  };
}
