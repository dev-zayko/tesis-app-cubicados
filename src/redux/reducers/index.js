import {combineReducers} from 'redux';
import auth from './auth';
import message from './message';
import project from './project';
import utility from './utility';

export default combineReducers({
  auth,
  message,
  project,
  utility,
});
