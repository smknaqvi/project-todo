import React from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  validateRequired,
  validateFieldLengths,
  validateAge,
} from "../utils/formValidators";
import fieldStyle from "../themes/field-style";

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

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: "levelOfPlay",
        id: "levelOfPlay",
      }}
    >
      {children}
    </Select>
  </FormControl>
);

const validate = (values) => {
  const requiredFields = ["username", "password", "cpassword", "birthday"];
  let errors = validateRequired(values, requiredFields);

  const fieldLengthRestrictions = {
    username: [3, 20],
    password: [4, 128],
  };
  errors = {
    ...errors,
    ...validateFieldLengths(values, fieldLengthRestrictions),
  };

  if (values.cpassword !== values.password) {
    errors.cpassword = "Passwords do not match";
  }

  errors = { ...errors, ...validateAge(values.birthday, 13, 200) };
  return errors;
};

let SignupForm = ({ handleSubmit, togglePage }) => {
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="fields">
        <div className="required-fields">
          <Field
            name="username"
            component={renderTextField}
            type="text"
            label="Username*"
          />
          <Field
            name="password"
            component={renderTextField}
            type="password"
            label="Password*"
          />
          <Field
            name="cpassword"
            component={renderTextField}
            type="password"
            label="Confirm Password*"
          />
        </div>
        <div className="opt-fields">
          <Field
            name="birthday"
            component={renderTextField}
            label="Birthday*"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Field
            name="favSport"
            component={renderTextField}
            type="text"
            label="Favorite Sport?"
          />
          <Field
            name="oddSport"
            component={renderTextField}
            type="text"
            label="Sport you're curious about?"
          />
          <Field
            name="favTeam"
            component={renderTextField}
            type="text"
            label="Favorite Team?"
          />
          <Field name="levelOfPlay" component={renderSelectField}>
            <option
              style={{
                background: fieldStyle.palette.field.offcolor,
                color: fieldStyle.palette.field.white,
              }}
              value="invalid"
            >
              Select your highest level of play
            </option>
            <option
              style={{
                background: fieldStyle.palette.field.offcolor,
                color: fieldStyle.palette.field.white,
              }}
              value="viewer"
            >
              Viewer
            </option>
            <option
              style={{
                background: fieldStyle.palette.field.offcolor,
                color: fieldStyle.palette.field.white,
              }}
              value="amateur"
            >
              Amateur
            </option>
            <option
              style={{
                background: fieldStyle.palette.field.offcolor,
                color: fieldStyle.palette.field.white,
              }}
              value="proam"
            >
              Pro-Am
            </option>
            <option
              style={{
                background: fieldStyle.palette.field.offcolor,
                color: fieldStyle.palette.field.white,
              }}
              value="pro"
            >
              Pro
            </option>
          </Field>
        </div>
      </div>
      <div className="sbs-buttons">
        <Button variant="outlined" id="toggle-page-button" onClick={togglePage}>
          Log In Here
        </Button>
        <Button variant="outlined" id="signup-button" type="submit">
          Sign Up
        </Button>
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
