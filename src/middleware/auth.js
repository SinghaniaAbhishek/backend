import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) return res.status(401).json({ error: { message: 'Missing token' } });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user and attach to req.user
    const user = await User.findById(payload.id).select('name email');
    if (!user) return res.status(401).json({ error: { message: 'User not found' } });

    req.user = user; // now req.user has _id, name, email
    next();
  } catch (e) {
    return res.status(401).json({ error: { message: 'Invalid token' } });
  }
}
