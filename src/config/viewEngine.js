import express from "express";

let configViewEngine = (app) => {
  app.use(express.static("./src/public")); //Dòng này cho phép Express phục vụ các file tĩnh (static files)
  app.set("view engine", "ejs"); //Cấu hình cho Express biết làm template engine để render HTML.
  app.set("views", "./src/views");
};

module.exports = configViewEngine;
