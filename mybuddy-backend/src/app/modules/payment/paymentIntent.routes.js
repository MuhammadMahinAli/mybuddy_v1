// Add this to your routes file
import express from "express";
import { createPaymentIntentController, getAllPayment, getPaymentStatus} from "./paymentIntent.controller.js";


const router = express.Router();

router.post("/create-payment-intent", createPaymentIntentController);
router.get('/payment-status/:paymentIntentId', getPaymentStatus);
router.get("/getAll", getAllPayment);
export const PaymentIntentRoutes = router;