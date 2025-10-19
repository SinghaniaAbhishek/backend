import express from 'express';
import { sendReminderEmails } from '../services/emailService.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Manual trigger for email reminders (for testing)
router.post('/send-reminders', authMiddleware, async (req, res, next) => {
  try {
    console.log('Manual email reminder trigger requested by user:', req.user.id);
    await sendReminderEmails();
    res.json({ 
      success: true, 
      message: 'Email reminders sent successfully' 
    });
  } catch (error) {
    next(error);
  }
});

export default router;

// Public GET endpoint for testing cron
router.get('/run-cron', async (req, res, next) => {
  try {
    await sendReminderEmails();
    res.json({ success: true, message: 'Cron reminders executed successfully' });
  } catch (err) {
    next(err);
  }
});

