// worker.js
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/db.js";
import { scheduleEmailReminders, runTestReminders } from "./src/services/scheduler.js";

async function startWorker() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("✅ Worker connected to MongoDB");

    // Start the email reminder scheduler
    scheduleEmailReminders();

    // Optional: test in dev mode
    if (process.env.NODE_ENV === "development") {
      await runTestReminders();
    }

    console.log("📧 Email reminder worker started and running...");
  } catch (err) {
    console.error("❌ Worker failed to start:", err);
    process.exit(1);
  }
}

startWorker();
