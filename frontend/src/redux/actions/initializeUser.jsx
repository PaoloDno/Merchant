import {setUser} from '../reducers/authSlice';

//iniitalize
export const initializeUser = () => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const user = JSON.parse(localStorage.getItem('user')) || null;

  if (token && user) {
    dispatch(setUser({ token, user }));
  }
};
