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
  const user = useAuthStore((state) => state.user); // for showing name

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

    axios
      .post('https://localhost:7252/api/User/Login', { email, password })
      .then((res) => {
        const { success, token, name, role, message } = res.data;

        if (success === '200') {
          setToken(token);
          setUser({ email, name });
          setRole(role);

          swal('Success', `Welcome, ${name}!`, 'success');

          if (role === 'Admin') {
            navigate('/admin');
          } else if (role === 'Owner') {
            navigate('/owner');
          } else {
            swal('Access Denied', 'Unknown role assigned.', 'error');
          }
        } else {
          swal('Login Failed', message || 'Please try again', 'error');
        }
      })
      .catch((err) => {
        console.error('Login Error:', err);
        swal('Error', 'Something went wrong. Try again later.', 'error');
      });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#f0f2f5' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-10 col-lg-6 col-xl-5">
            <div className="card shadow p-4" style={{ borderRadius: '15px' }}>
              <h3 className="text-center text-primary mb-4">Login</h3>
              <form onSubmit={handleLogin} autoComplete="on">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
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
                    id="password"
                    autoComplete="current-password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  {errors.password && <div className="text-danger small">{errors.password}</div>}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>

              {user?.name && (
                <div className="mt-3 text-center text-success">
                  Welcome, <strong>{user.name}</strong>!
                </div>
              )}
            </div>
          </div>

          <div className="col-md-10 col-lg-6 col-xl-5 d-none d-lg-block">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Login illustration"
              className="img-fluid"
              style={{ borderRadius: '15px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
