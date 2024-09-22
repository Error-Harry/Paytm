export const validateName = (name) => {
  const nameRegex = /^[a-zA-ZàâäéèêëïîôöùûüÿçÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ'-]+$/;

  if (!name.trim()) {
    return "This field is required";
  }
  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }
  if (!nameRegex.test(name)) {
    return "Name can only contain letters, hyphens, and apostrophes";
  }
  return null;
};

export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
  const consecutiveSpecialCharRegex = /([._-])\1/;

  if (!username.trim()) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters";
  if (username.length > 20) return "Username cannot exceed 20 characters";
  if (!usernameRegex.test(username))
    return "Username can only contain letters, numbers, underscores, periods, or hyphens";
  if (/\s/.test(username)) return "Username cannot contain spaces";
  if (consecutiveSpecialCharRegex.test(username))
    return "Username cannot contain consecutive periods, underscores, or hyphens";
  if (/^[._-]/.test(username))
    return "Username cannot start with a period, underscore, or hyphen";
  if (/[._-]$/.test(username))
    return "Username cannot end with a period, underscore, or hyphen";

  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  if (password.length > 64) return "Password cannot exceed 64 characters";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/\d/.test(password)) return "Password must contain at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Password must contain at least one special character";
  if (/\s/.test(password)) return "Password cannot contain spaces";

  return null;
};
export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) return "Passwords do not match";

  return null;
};

export const validateSignInPassword = (password) => {
  if (!password) return "Password is required";

  return null;
};
