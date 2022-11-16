import {GET_PROJECTS} from '../actions/type';

const inititalState = {
  projects: [],
};
export default function (state = inititalState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload.projects,
      };
    default:
      return state;
  }
}
