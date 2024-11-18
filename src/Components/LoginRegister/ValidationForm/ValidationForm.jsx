function ValidationForm(values) {
  const error = {};

  const patternEmail = /^(.+)@(.+)\.([a-zA-Z]{2,})$/;
  if (values.password.length < 8 && values.password !== "") {
    error.password = "Your password must be at least 8 characters long.";
  }
  if (!patternEmail.test(values.email) && values.email !== "") {
    error.email = "Please enter a valid email format like example@email.com";
  }
  if (values.username && values.username.length < 3) {
    error.username = "Too short.";
  }
  return error;
}

export default ValidationForm;
