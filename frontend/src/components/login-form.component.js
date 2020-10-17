import React from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const validate = (values) => {
  const errors = {};
  const requiredFields = ["username", "password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

let LoginForm = ({ handleSubmit, togglePage }) => {
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Field
        name="username"
        component={renderTextField}
        type="text"
        placeholder="Username"
      />
      <Field
        name="password"
        component={renderTextField}
        type="password"
        placeholder="Password"
      />
      <div className="sbs-buttons">
        <Button variant="outlined" id="toggle-page-button" onClick={togglePage}>
          Sign up here
        </Button>
        <Button variant="outlined" id="login-button" type="submit">
          Log In
        </Button>
      </div>
    </form>
  );
};

LoginForm = reduxForm({
  form: "login",
  validate,
})(LoginForm);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  togglePage: PropTypes.func,
};

export default LoginForm;
