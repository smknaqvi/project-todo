import React from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  const errors = {};
  const requiredFields = ["username", "password", "cpassword", "age"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  const strLengthRestrictions = {
    username: [3, 20],
    bio: [0, 300],
  };

  Object.entries(strLengthRestrictions).forEach(([field, limits]) => {
    const min = limits[0];
    const max = limits[1];
    if (
      values[field] &&
      (values[field].length < min || values[field].length > max)
    ) {
      errors[field] =
        field + " must be between " + min + " and " + max + " characters long";
    }
  });

  if (values.age < 13) {
    errors.age = "Must be at least 13 years old";
  } else if (values.age > 200) {
    errors.age = "Please enter a valid age";
  }
  return errors;
};

let MyProfileForm = ({ handleSubmit, togglePage, initialValues }) => {
  return (
    <form className="my-profile-form" onSubmit={handleSubmit}>
      <div className="fields">
        <div className="opt-fields">
          <Field
            name="bio"
            component={renderTextField}
            type="text"
            placeholder="Tell the world about yourself"
            label="Bio"
          />
          <Field
            name="age"
            component={renderTextField}
            type="number"
            placeholder="Age"
            label="Age"
          />
          <Field
            name="favSport"
            component={renderTextField}
            type="text"
            placeholder="Favorite Sport?"
            label="Favorite Sport"
          />
          <Field
            name="oddSport"
            component={renderTextField}
            type="text"
            placeholder="Sport you're curious about?"
            label="A sport you'd like to learn more about"
          />
          <Field
            name="favTeam"
            component={renderTextField}
            type="text"
            placeholder="Favorite Team?"
            label="Favorite Team"
          />
          <Field name="levelOfPlay" component={renderSelectField}>
            <option value="invalid">Select your highest level of play</option>
            <option value="viewer">Viewer</option>
            <option value="amateur">Amateur</option>
            <option value="proam">Pro-Am</option>
            <option value="pro">Pro</option>
            label="Level Of Play"
          </Field>
        </div>
      </div>
      <div className="sbs-buttons">
        <Button variant="outlined" id="signup-button" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

MyProfileForm = reduxForm({
  form: "signup",
  validate,
  enableReinitialize: true,
})(MyProfileForm);

MyProfileForm.propTypes = {
  handleSubmit: PropTypes.func,
  togglePage: PropTypes.func,
};

export default MyProfileForm;
