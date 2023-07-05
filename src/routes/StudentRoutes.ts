import { Router } from "express";
import StudentController from "../controllers/StudentController";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.get('/', loginRequired, StudentController.index);
router.post('/', loginRequired, StudentController.store);
router.put('/:id', loginRequired, StudentController.update);
router.get('/:id', StudentController.show);
router.delete('/:id', loginRequired, StudentController.delete);
router.get('/search/:query', loginRequired, StudentController.find);

export default router;