//type
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_MESSAGE,
  TOKEN,
} from './type';
//AuthService
import AuthService from '../../services/auth/authService';
//JWT DECODE
import jwt_decode from 'jwt-decode';

export const login = user => dispatch => {
  return AuthService.logIn(user).then(
    response => {
      switch (response.status) {
        case 'isClient':
          const decoded = jwt_decode(response.token);
          const {user_status} = decoded.user;
          switch (user_status.id) {
            case 1:
              dispatch({
                type: LOGIN_SUCCESS,
                payload: {user: decoded.user},
              });
              dispatch({
                type: TOKEN,
                payload: {token: response.token},
              });
              return Promise.resolve({
                status: 1,
                verified: response.verified,
                message: 'success',
              });
            case 2:
              return Promise.resolve({
                status: 2,
                verified: response.verified,
                message:
                  decoded.user.first_name +
                  ', su cuenta ha sido suspendida por no pago, podra acceder pero con las funciones basicas',
              });
            case 3:
              return Promise.resolve({
                status: 1,
                message:
                  'Estimado ' +
                  decoded.user.first_name +
                  ', su cuenta a sido baneada por incumplimiento de nuestras normas',
              });
          }
          break;
        case 'isAdmin':
          break;
        case 'incorrect':
          return Promise.resolve({
            status: 2,
          });
          break;
      }
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    },
  );
};
export const register = newUser => dispatch => {
  return AuthService.register(newUser).then(
    response => {
      if (response.status === 'duplicated') {
        return Promise.resolve({status: response.status});
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data,
        });
        dispatch({
          type: TOKEN,
          payload: {token: response.token},
        });
        const decoded = jwt_decode(response.token);
        console.log(decoded);
        return Promise.resolve({
          status: response.status,
          email: decoded.user.email,
          name: decoded.user.first_name,
          token: response.token,
        });
      }
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    },
  );
};
export const logout = () => dispatch => {
  return AuthService.logOut().then(response => {
    if (response.status === 'success') {
      dispatch({
        type: LOGOUT,
      });
      return Promise.resolve(response);
    }
  });
};
