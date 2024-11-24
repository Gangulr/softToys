import express from "express";
const categoryRoutes = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

categoryRoutes.route("/").post(createCategory);
categoryRoutes.route("/:categoryId").put(updateCategory);
categoryRoutes
  .route("/:categoryId")
  .delete(removeCategory);

categoryRoutes.route("/categories").get(listCategory);
categoryRoutes.route("/:id").get(readCategory);

export default categoryRoutes;