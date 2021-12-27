const initialState = {
  userInfo: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE':
      return null;
    case 'SET':
      return { ...action.payload };
    case 'GET':
    default:
      return state;
  }
};

export default authReducer;
