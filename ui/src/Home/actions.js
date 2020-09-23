export const SEND_AUTH_CHECK = 'Home.SEND_AUTH_CHECK';
export const sendAuthCheck = (username, password, gameid) => ({
  type: SEND_AUTH_CHECK,
  payload: { username, password, gameid }
});

export const SKIP_AUTH_CHECK = 'Home.SKIP_AUTH_CHECK';
export const skipAuthCheck = (skipAuth) => ({
  type: SKIP_AUTH_CHECK,
  payload: {skipAuth}
});

export const USER_LOGOUT = 'Home.USER_LOGOUT';
export const logout = () => ({
  type: USER_LOGOUT,
  payload: {}
});