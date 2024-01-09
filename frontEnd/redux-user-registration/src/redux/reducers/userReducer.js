// userReducer.js
const initialState = {
    user: null,
    file: null,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
        return { ...state, user: action.payload, error: null };
      case 'REGISTER_FAILURE':
        return { ...state, error: action.payload };
      case 'UPLOAD_SUCCESS':
        return { ...state, file: action.payload, error: null };
      case 'UPLOAD_FAILURE':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  