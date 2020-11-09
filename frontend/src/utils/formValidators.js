export const validateRequired = (values, fields) => {
  const errors = {};
  fields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

export const validateFieldLengths = (values, lenMapping) => {
  const errors = {};
  Object.entries(lenMapping).forEach(([field, limits]) => {
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
  return errors;
};

export const validateAge = (birthday, minAge, maxAge) => {
  // https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd/7091965#7091965
  const errors = {};
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  if (age < minAge) {
    errors.birthday = "Must be at least 13 years old";
  } else if (age > maxAge) {
    errors.birthday = "Please select a valid age";
  }
  return errors;
};
