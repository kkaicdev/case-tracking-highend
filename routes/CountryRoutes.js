import express from "express";
import {avaliar, buscar, listar} from "../controllers/CountryController.js";

const router = express.Router();

router.post("/avaliar", avaliar);
router.get("/buscar", buscar);
router.get("/listar", listar);

export default router;