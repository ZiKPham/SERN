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

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  getAll,
};
