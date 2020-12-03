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
  const requiredFields = ["birthday"];
  let errors = validateRequired(values, requiredFields);

  const fieldLengthRestrictions = {
    bio: [0, 300],
  };
  errors = {
    ...errors,
    ...validateFieldLengths(values, fieldLengthRestrictions),
  };

  errors = { ...errors, ...validateAge(values.birthday, 13, 200) };
  return errors;
};

let MyProfileForm = ({ handleSubmit }) => {
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
            name="birthday"
            component={renderTextField}
            label="Birthday"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
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
          <Field
            name="levelOfPlay"
            component={renderSelectField}
            label="Level Of Play"
          >
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
};

export default MyProfileForm;
