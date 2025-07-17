import React from 'react';
import './TaskOne.css';
import useForm from './useForm';

function TaskOne() {
  const onSubmitHandle = (formData) => {
    alert(JSON.stringify(formData));
  };

  const { formData, handleChange, handleSubmit, error } = useForm(onSubmitHandle);

  return (
    <div className="form-container">
      <div className="error-message">{error}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="form-input"
          onChange={handleChange}
          value={formData.firstName}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="form-input"
          onChange={handleChange}
          value={formData.lastName}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-input"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-input"
          onChange={handleChange}
          value={formData.password}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="form-input"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        <button type="submit" className="form-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default TaskOne;