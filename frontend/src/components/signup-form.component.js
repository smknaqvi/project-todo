import React from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  } else if (values.username.length > 20) {
    errors.username = "Username must be at most 20 characters long";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 4) {
    errors.password = "Username must be at least 4 characters long";
  } else if (values.password.length > 128) {
    errors.password = "Username must be at most 128 characters long";
  }
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.cpassword !== values.password) {
    errors.cpassword = "Passwords do not match";
  }
  if (!values.age) {
    errors.age = "Required";
  } else if (values.age < 13) {
    errors.age = "Must be at least 13 years old";
  } else if (values.age > 200) {
    errors.age = "Please enter a valid age";
  }
  return errors;
};

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="render-field">
    <input {...input} placeholder={placeholder} type={type} />
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

let SignupForm = ({ handleSubmit, togglePage }) => {
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="required-fields">
        <Field
          name="username"
          component={renderField}
          type="text"
          placeholder="Username"
        />
        <Field
          name="password"
          component={renderField}
          type="password"
          placeholder="Password"
        />
        <Field
          name="cpassword"
          component={renderField}
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div className="opt-fields">
        <Field
          name="age"
          component={renderField}
          type="number"
          placeholder="Age"
        />
        <Field
          name="favSport"
          component="input"
          type="text"
          placeholder="Favorite Sport?"
        />
        <Field
          name="oddSport"
          component="input"
          type="text"
          placeholder="Sport you're curious about?"
        />
        <Field
          name="favTeam"
          component="input"
          type="text"
          placeholder="Favorite Team?"
        />
        <Field name="levelOfPlay" component="select">
          <option value="invalid">Select your highest level of play</option>
          <option value="viewer">Viewer</option>
          <option value="amateur">Amateur</option>
          <option value="proam">Pro-Am</option>
          <option value="pro">Pro</option>
        </Field>
        <button id="signup-button" type="submit">
          Sign Up
        </button>
        <button id="toggle-page-button" onClick={togglePage}>
          Already a user? Login here.
        </button>
      </div>
    </form>
  );
};

SignupForm = reduxForm({
  form: "signup",
  validate,
})(SignupForm);

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  togglePage: PropTypes.func,
};

export default SignupForm;
