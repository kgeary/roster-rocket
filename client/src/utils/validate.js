const name = (str) => {
  return /^[a-z0-9_ -.]{3,32}$/i.test(str);
}

const email = (str) => {
  return /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/i.test(str);
}

/**
 * Validate a password
 * 6-18 characters
 * Letters, Numbers, and the special Chars _- !@#$%&.,
 * Returns true for valid password, false otherwise.
 * @param {String} str
 */
const password = (str) => {
  return /^[a-z0-9 _-]{6,18}$/i.test(str);
}

export default {
  email,
  password,
  name,
}