import { Router } from "express";
import UserController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";


const router = Router();

router.get('/', UserController.index); // lista todos os usuários
router.get('/:id', UserController.show); // lista usuário
router.post('/', UserController.store);


router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;


/*
index -> lista todos os usuarios! -> get
store/create -> cria um novo usuario ->post
delete -> apaga um usuario! -> delete
show -> mostra um usuario -> Get
update -> atualiza um usuario - >patch ou put
*/