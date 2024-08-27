import { initializeApp, applicationDefault } from "firebase-admin/app";
import dotenv from "dotenv";
dotenv.config();

process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID,
});
