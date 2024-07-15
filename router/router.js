import { Router } from "express"; 
const router=Router();
import * as controller from  '../router/controller.js'


router.route('/gettask').get(controller.getTask);
router.route('/gettask/:id').get(controller.getTaskById);
router.route('/addTask').post(controller.addTask);
router.route('/editProgress').put(controller.editProgress);
router.route('/deleteTask').delete(controller.deleteTask);





export default router