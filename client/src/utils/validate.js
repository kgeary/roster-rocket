const user = (str) => {
  return /^[a-z0-9_-]{3,16}$/.test(str);
}

const email = (str) => {
  return /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/.test(str);
}

const password = (str) => {
  return /^[a-z0-9_-]{6,18}$/.test(str);
}

export default {
  email,
  password,
  user,
}