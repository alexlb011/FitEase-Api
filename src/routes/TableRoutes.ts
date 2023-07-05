import { Router } from "express";

import TableController from "../controllers/TableController";
import loginRequired from "../middlewares/loginRequired";


const router = Router();

router.get('/', TableController.index);
router.post('/', TableController.store);
router.put('/:id', TableController.edit);
router.delete('/', TableController.delete);


export default router;