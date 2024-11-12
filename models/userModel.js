const userArray = require('../bookhiveprofpage.json')
 
let nextId = 1;

const getAll = () => {
  return userArray;
};

const addOne = (name, email, password) => {
  if (!name | !email | !password) {
    return false;
  }
  const newUser = {
    id: nextId++,
    name: name,
    email,
    password,
  };
  userArray.push(newUser);
  return newUser;
};

const findById = (id) => {
  const user = userArray.find((user) => user.id === Number(id));
  if (user) {
    return user;
  } else return false;
};

const updateOneById = (id, updatedData) => {
  const user = findById(id);
  if (user) {
    Object.assign(user, {...updatedData});
    return user;
  }
  return false;
};

const deleteOneById = (id) => {
  const user = findById(id);
  if (user) {
    const initialLenght = userArray.length;
    userArray = userArray.filter((user) => user.id !== Number(id));
    return userArray.length < initialLenght;
  } else return false;
};

module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};
