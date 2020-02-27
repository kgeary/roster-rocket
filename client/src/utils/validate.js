const user = (str) => {
  return /^[a-z0-9_-]{3,16}$/i.test(str);
}

const email = (str) => {
  return /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/i.test(str);
}

const password = (str) => {
  return /^[a-z0-9_-]{6,18}$/i.test(str);
}

export default {
  email,
  password,
  user,
}