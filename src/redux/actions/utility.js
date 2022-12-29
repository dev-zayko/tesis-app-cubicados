import UtilityService from '../../services/utility/utilityService';
import {LOGIN_SUCCESS, SET_MESSAGE} from './type';

export const getCount = token => dispatch => {
  return UtilityService.getCount(token).then(response => {
    return Promise.resolve(response);
  });
};
export const stateUser = token => dispatch => {
  return UtilityService.stateUser(token).then(
    response => {
      const {user_status} = response;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {user: response.data},
      });

      return Promise.resolve(user_status);
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    },
  );
};
