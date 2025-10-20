import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController.js";

let router = express.Router();

let initWebRoutes = (app) => {
  //GET
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.get("/get-crud", homeController.getAll);
  router.get("/edit-crud", homeController.getEdit);
  router.get("/delete-crud", homeController.deleteUser);

  //POST
  router.post("/post-crud", homeController.postCRUD);
  router.post("/api/login", userController.handleLogin);

  //PUT
  router.post("/put-crud", homeController.putUser);

  ///DELETE

  return app.use("/", router);
};

export default initWebRoutes;
