import express from "express";
import { sendBatchNotification } from "../controllers/index.js";
import { sendBatchFCMNotificationMiddleware } from "../middleware/fcm.js";

const router = express.Router();

router.post(
  "/notification",
  sendBatchFCMNotificationMiddleware,
  sendBatchNotification
);

export default router;
