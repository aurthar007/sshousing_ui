import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    axios.post('https://localhost:7252/api/User/Register', formData)
      .then(res => {
        setLoading(false);
        if (res.data === 'duplicate') {
          swal('Duplicate Email', 'Please use another email!', 'error');
        } else {
          swal('Success', 'Registration successful!', 'success');
          setFormData({ Username: '', email: '', password: '' });
          setErrors({});
        }
      })
      .catch(err => {
        setLoading(false);
        console.error('Registration error:', err);
        const message = err.response?.data?.message || 'Registration failed. Please try again.';
        swal('Error', message, 'error');
      });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      {/* Name */}
                      <div className="mb-4">
                        <input
                          type="text"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          name="name"
                          placeholder="Enter Name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && <small className="text-danger">{errors.name}</small>}
                      </div>

                      {/* Email */}
                      <div className="mb-4">
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          name="email"
                          placeholder="Enter Email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                      </div>

                      {/* Password */}
                      <div className="mb-4">
                        <input
                          type="password"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          name="password"
                          placeholder="Enter Password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                      </div>

                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                          {loading ? 'Registering...' : 'Register'}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Register illustration"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
