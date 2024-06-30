// joyasRouter.js
import { Router } from "express";
import { getAllDataLimit, getAllDataWithFilters } from '../controllers/joyasController.js';

const router = Router();

// rutas
router.get('/joyas', getAllDataLimit);
router.get('/joyas/filtros', getAllDataWithFilters);

export default router;