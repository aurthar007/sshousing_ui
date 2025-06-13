import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../Store/useAuthStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const setRole = useAuthStore((state) => state.setRole);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios.post('https://localhost:7252/api/User/Login', { email, password })
      .then(res => {
        const { success, token, user, role } = res.data;
        if (success === "200") {
          const roleName = role?.name || role;
          setToken(token);
          setUser(user);
          setRole(roleName);

          if (roleName === 'Admin') {
            navigate('/admin');
          } else if (roleName === 'Owner') {
            navigate('/owner');
          } else {
            swal("Unknown role. Access denied.");
          }
        } else if (success === "400") {
          swal("Invalid Credentials");
        } else if (success === "401") {
          swal("You need access. Please contact our customer support!");
        }
      })
      .catch(err => {
        console.error('Login error:', err.response?.data || err.message);
        swal('Login failed. Please try again.');
      });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#f0f2f5' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
               <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card p-4 shadow" style={{ borderRadius: '15px' }}>
              <h3 className="text-center mb-4 text-primary">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                  {errors.email && <div className="text-danger small">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  {errors.password && <div className="text-danger small">{errors.password}</div>}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-7 col-lg-6 col-xl-7 d-flex align-items-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Login illustration"
              style={{ borderRadius: '15px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
