const userModel = require("./models/user");

exports = module.exports = {};

exports.findUsers = async (query) => {
  const users = await userModel.find(query);
  return users;
};

exports.findOneUser = async (query) => {
  const user = await userModel.findOne(query);
  return user;
};

exports.addOneUser = async (data) => {
  const user = new userModel(data);
  await user.save();
  return user;
};

exports.updateUser = async (query, update) => {
  await userModel.updateOne(query, update, {
    new: true,
  });
  const updatedUser = await userModel.findOne(query);
  return updatedUser;
};
