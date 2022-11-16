import {TOKEN} from '../actions/type';

const initialState = {
  token: null,
};
export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case TOKEN:
      return {
        ...state,
        token: payload.token,
      };
    default:
      return state;
  }
}
