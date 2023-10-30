import React from 'react';
import './style.css';
import React, { useState, useEffect } from 'react';

export default function App() {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    conformPassword: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (
      Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="success"> Submit Successfully </div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )
    ) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = 'Username is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password cannot exceed more than 10 characters';
    }
    if (!values.conformPassword) {
      errors.conformPassword = 'Conform Password is required';
    } else if (values.conformPassword.length < 4) {
      errors.conformPassword =
        'Conform Password must be more than 4 characters';
    } else if (values.conformPassword.length > 10) {
      errors.conformPassword =
        'Conform Password cannot exceed more than 10 characters';
    }
    return errors;
  };

  return (
    <div id="flex">
      <div className="circle"></div>
      <div className="circle"></div>
      <div id="form_container">
        <form onSubmit={handleSubmit}>
          <div id="container_1">
            <label id="one">UserName: </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              id="username"
              value={formValues.username}
              onChange={handleChange}
            />
            <p id="error"> {formErrors.username} </p>
          </div>

          <div id="container_2">
            <label id="two">Email: </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <p> {formErrors.email} </p>
          </div>

          <div id="container_3">
            <label id="three">Password: </label>
            <input
              type="text"
              name="password"
              placeholder="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p> {formErrors.password} </p>
          </div>

          <div id="container_4">
            <label id="four">Conform Password: </label>
            <input
              type="text"
              name="conformPassword"
              placeholder="conform password"
              id="conformpassword"
              value={formValues.conformPassword}
              onChange={handleChange}
            />
            <p> {formErrors.conformPassword} </p>
          </div>

          <input id="submit" type="submit" />
        </form>

        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="success">Submit Successfully!</div>
        ) : (
          <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        )}
      </div>

      <br />
    </div>
  );
}
