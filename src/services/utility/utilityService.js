import ApiClient from '../connection/ApiClient';
import {SET_MESSAGE} from '../../redux/actions/type';

const getCount = async token => {
  return ApiClient.post(
    'count/get',
    {},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const stateUser = async token => {
  return ApiClient.post(
    'state/get',
    {},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const errorMessage = (error, dispatch) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
  return Promise.reject();
};

export default {
  getCount,
  stateUser,
  errorMessage,
};
