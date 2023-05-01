export default function login_validate(values) {
  // create an object for erros
  const errors = {};

  //if no email
  if (!values.email) {
    errors.email = "Required";
    //if format is not valid
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  //if no password
  if (!values.password) {
    errors.password = "Required";
    //if password does not meet requirements
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater than 8 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "No whitespace allowed";
  }

  return errors;
}

export function registerValidate(values) {
  // create an object for erros
  const errors = {};

  //validation for email
  if (!values.email) {
    errors.email = "Required";
    //if format is not valid
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.username) {
    errors.username = "Required username";
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid username";
  }

  //validation for password
  if (!values.password) {
    errors.password = "Required";
    //if password does not meet requirements
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater than 8 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "No whitespace allowed";
  }

  //validation fo confirm password
  if (!values.confirmpassword) {
    errors.confirmpassword = "Required";
    //if password does not meet requirements
  } else if (values.password !== values.confirmpassword) {
    errors.confirmpassword = "Passwords does not match";
  } else if (values.confirmpassword.includes(" ")) {
    errors.confirmpassword = "Invalid";
  }

  return errors;
}
