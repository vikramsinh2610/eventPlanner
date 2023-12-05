import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Registration = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (formData.username.trim() === '') {
      validationErrors.username = 'Name is required';
    }
    if (formData.email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'Please enter a valid email address';
    }
    if (formData.phone.trim() === '' || !/^[0-9]{10}$/.test(formData.phone)) {
      validationErrors.phone = 'Please enter a valid phone number';
    }
    if (formData.password.trim() === '' || !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test(formData.password)) {
      validationErrors.password = 'Please enter a strong password';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await createUser(JSON.stringify(formData));

        if (response) {
          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              if (response?.token) {
                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: response.msg,
                  showConfirmButton: false,
                  timer: 1500,
                });
                localStorage.setItem('token',response?.token);
                // setIsAuthenticated(true);
                navigate(`/eventlist`);

              } else {
                Swal.fire({
                  icon: 'warning',
                  title: 'Error!',
                  text: response.msg,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            },
          });
        }
      } catch (error) {
        console.error('API Error:', error);
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', false);
            setIsAuthenticated(false);

            Swal.fire({
              icon: 'warning',
              title: error.response.data.msg,
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      }
    }
  };

  return (
    <div className="small-container">
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="username" value={formData.username} onChange={handleInputChange} />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
