// userActions.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

export const registerUser = (userData) => async (dispatch) => {
  try {
    console.log("userData",userData);
    const response = await axiosInstance.post('/api/users/register', userData);
    console.log('responnse',response);
    // dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    // dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data });
  }
};

export const uploadFile = (fileData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/api/files/upload', fileData);
    dispatch({ type: 'UPLOAD_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPLOAD_FAILURE', payload: error.response.data });
  }
};
