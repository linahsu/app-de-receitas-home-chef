import { AnyAction } from 'redux';

const initialState = {
  user: '',
};

export const userLoginReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: '' };
    default:
      return state;
  }
};
