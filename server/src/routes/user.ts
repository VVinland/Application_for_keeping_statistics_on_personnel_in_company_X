import { Router } from 'express';
import userController from '../controllers/userController.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';
import registrationMiddleware from '../middlewares/registrationMiddlaware.js';

const router = Router();

router.post('/registration', registrationMiddleware, userController.registration); //выполнил
router.post('/lastStepOfRegisteringEmployee', //выполнил
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 32 }),
    userController.lastStepOfRegisteringEmployee);
router.post('/login', userController.login); //выполнил

router.get('/salaryPayments/:value', userController.getSalaryPayments);

router.get('/getAllUsers', authMiddleware, userController.getAllUsers);//выполнил
router.get('/refresh', userController.refresh);//выполнил
router.get('/logout:id', userController.logout); //выполнил
router.get('/numberHired/:value', userController.getNumberHired);  //выполнил
router.get('/numberDismissed/:value', userController.getNumberDismissed); //выполнил
router.get('/birthdays/:value', userController.getBirthdays) //выполнил


router.put('/employee', userController.updateUser);//выполнил

router.delete('/employee', userController.deleteUser); //выполнил

export default router;