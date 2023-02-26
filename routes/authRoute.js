import express from 'express';
import {
   registerController,
   loginController,
   testController,
   updateProfileController,
   forgotPasswordController,
   getOrdersController,
   orderStatusController,
   getAllOrdersController
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();


// routing
// REGISTER || METHOD POST
router.post('/register', registerController)

// LOGIN || METHOD POST
router.post('/login', loginController)

// FORGOT PASSWORD || POST
router.post('/forgot-password', forgotPasswordController)

// TEST || METHOD GET
router.get('/test', requireSignIn, isAdmin, testController)

// PROTECTED ROUTE || METHOD GET
router.get('/user-auth', requireSignIn, (req, res) => {
   res.status(200).send({ ok: true })
})

// PROTECTED ADMIN ROUTE || METHOD GET
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
   res.status(200).send({ ok: true })
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
   "/order-status/:orderId",
   requireSignIn,
   isAdmin,
   orderStatusController
);

export default router;