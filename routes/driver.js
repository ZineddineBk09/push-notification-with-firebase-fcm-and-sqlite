import express from "express";
import {
  createPushNotification,
  sendBatchNotification,
  findAllDriverNotifications,
  findAllUnreadNotifications,
  createDriver,
  updateDriver,
} from "../controllers/driver.js";
import { verifyToken } from "../middleware/authJwt.js";
import {
  sendBatchFCMNotificationMiddleware,
  sendFCMNotificationMiddleware,
} from "../middleware/fcm.js";

const router = express.Router();

router.use(verifyToken);

// Push Notifications
router.post(
  "/notification",
  sendFCMNotificationMiddleware,
  createPushNotification
);
router.post(
  "/notification/batch",
  sendBatchFCMNotificationMiddleware,
  sendBatchNotification
);
router.get("/notification/driver/:driverId", findAllDriverNotifications);
router.get("/notification/unread/:driverId", findAllUnreadNotifications);

// Driver
router.post("/driver", createDriver);
router.put("/driver", updateDriver);

export default router;
