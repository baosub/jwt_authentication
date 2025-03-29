//routes/auth.ts

import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

const user = {
  id: 1,
  username: 'testuser',
  password: '123456', // en la vida real jamás lo harías así
};

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'valor_por_defecto';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username || password !== user.password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  return res.json({ token });
});

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Perfil accedido correctamente', user: req.user });
});

export default router;
