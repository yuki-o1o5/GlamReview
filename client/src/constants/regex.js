export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

export const emailRegex = /\S+@\S+\.\S+/;

export const errUserName = "User name is required";

export const errEmail = "Please enter valid email format";

export const errPassword = "6+ characters, with at least one upper and a digit";

export const errPasswordConf = "Please confirm your password";

export const errUserNotFound = "User not found";

export const successMessage = "Sucessfully! registerd";

export const EMPTY = "";
export const NAME_INVALID = "Please enter a valid name.";
export const EMAIL_INVALID = "Please enter a valid email address.";
export const EMAIL_EXISTS =
  "The email address has already existed. Try another email address.";
export const PASSWORD_INVALID = "Please enter a valid password.";
export const PASSWORD_UNMATCHED = "Passwords do not match.";
export const REGISTER_SUCCESSFUL = "Registration is successful.";
export const REGISTER_ERROR = "Registration failed.";
export const LOGIN_SUCCESSFUL = "Login is successful";
export const LOGIN_ERROR = "Login failed. Invalid email or password.";
