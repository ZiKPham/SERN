import bcrypt from "bcrypt";
import db from "../models/index";
import { raw } from "body-parser";
import e from "express";
import { where } from "sequelize";
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
      let users = await db.User.findAll({
        raw: true, //lấy dữ liệu thuần (object JS)
      });

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserId = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findOne({
        where: {
          id: userId,
        },
        raw: true,
      });
      if (users) {
        resolve(users);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.gender = data.gender;
        user.roleId = data.roleId;

        await user.save();
        let users = await db.User.findAll({
          raw: true, //lấy dữ liệu thuần (object JS)
        });
        resolve(users);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
      }
      let users = await db.User.findAll({
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

export default {
  createNewUser,
  hashUserPassword,
  getAllUser,
  getUserId,
  updateUserData,
  deleteUserById,
};
