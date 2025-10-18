import db from "../models/index";
import CRUDServices from "../services/CRUDServices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDServices.createNewUser(req.body);
  console.log(message);
  return res.send("post crud from server");
};

let getAll = async (req, res) => {
  let allUsers = await CRUDServices.getAllUser();
  console.log(allUsers);
  return res.render("getAllUsers.ejs", {
    dataUsers: allUsers,
  });
};

let getEdit = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let user = await CRUDServices.getUserId(userId);
    return res.render("editUser.ejs", {
      dataUser: user,
    });
  } else {
    return res.send("User not found");
  }
};

let putUser = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDServices.updateUserData(data);
  return res.render("getAllUsers.ejs", {
    dataUsers: allUsers,
  });
};

let deleteUser = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let allUsers = await CRUDServices.deleteUserById(id);
    return res.render("getAllUsers.ejs", {
      dataUsers: allUsers,
    });
  } else {
    return res.send("User not found");
  }
};

export default {
  getHomePage,
  getCRUD,
  postCRUD,
  getAll,
  getEdit,
  putUser,
  deleteUser,
};
