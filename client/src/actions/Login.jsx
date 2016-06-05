import { LOGIN } from './ActionTypes.jsx';
import request from 'axios';
import { pushState } from 'redux-react-router';

function doTypingName() {
  return { type: 'NAME_TYPING' };
}

function beginLogin() {
  return { type: 'LOGIN_ING' };
}

function loginSuccess(data) {
  return { type: 'LOGIN_SUCCESS', success: data };
}

function receiveError(error) {
  return { type: 'LOGIN_FAILED', fail: error };
}





export function submit(data) {
  return LOGIN.SUBMIT_TODO;
}

export function typingName() {
  return (dispatch) => {
    dispatch(doTypingName());
  };
}

export function doLogin(userName, password) {
  debugger
  return (dispatch) => {
    dispatch(beginLogin());
    return request({
      url: '/admin/doLogin',
      timeout: 20000,
      method: 'post',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      params: {
        userName: userName,
        password: password
      },
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
