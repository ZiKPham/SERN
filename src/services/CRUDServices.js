import bcrypt from "bcrypt";
import db from "../models/index";
const saltRounds = 10;

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashUserPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("Create User Success!");
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        // attributes: [
        //   "email",
        //   "firstName",
        //   "lastName",
        //   "address",
        //   "phoneNumber",
        //   "gender",
        // ],
        raw: true, //lấy dữ liệu thuần (object JS)
      });

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds); //tạo chuỗi “muối” (salt) ngẫu nhiên.
      const hash = await bcrypt.hash(password, salt); //kết hợp mật khẩu + salt để tạo ra chuỗi băm an toàn.
      resolve(hash);
    } catch (error) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser,
  hashUserPassword,
  getAllUser,
};
