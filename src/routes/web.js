import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  //GET
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.get("/get-crud", homeController.getAll);

  //POST
  router.post("/post-crud", homeController.postCRUD);

  return app.use("/", router);
};

module.exports = initWebRoutes;
