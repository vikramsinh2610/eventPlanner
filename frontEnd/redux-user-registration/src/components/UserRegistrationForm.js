// UserRegistrationForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';

const UserRegistrationForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, avatar: e.target.files[0].name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('phone', userData.phone);
    formData.append('avatar', userData.avatar);

    dispatch(registerUser(formData));
  };

  return (
    <form onSubmit={handleSubmit} enctype="multipart/form-data">
      <label>
        Username:
        <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Phone:
        <input type="number" name="phone" value={userData.phone} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Avatar:
        <input type="file" name="avatar" onChange={handleFileChange} />
      </label>
      <br />
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default UserRegistrationForm;
