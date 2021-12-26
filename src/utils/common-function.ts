export const getUserInfo = () => {
  if (typeof window !== 'undefined' && window.localStorage.userInfo) {
    return JSON.parse(window.localStorage.userInfo);
  } else return null;
};
