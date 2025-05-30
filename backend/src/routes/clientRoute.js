import express from "express";
import {
  getClients,
  handleCreateClients,
  handleUpdateClient,
  handleDeleteClient,
  handleSearchClient,
} from "../controllers/clientController.js";

// Routes : มีหน้าที่ เชื่อมURL กับ Controller -----> [ เมื่อมีคนเรียก URL นี้ ---> ให้ไปทำงานใน Function(Controller) นี้ ]
const router = express.Router();

router.get("/clients", getClients);
router.post("/clients", handleCreateClients);
router.put("/clients/:id", handleUpdateClient);
router.delete("/clients/:id", handleDeleteClient);
router.get("/clients/search", handleSearchClient);

export default router;
