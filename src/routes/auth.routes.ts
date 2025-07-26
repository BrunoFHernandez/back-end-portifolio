import { Router } from 'express';
import { register, login } from '../services/auth.services';
import { registerSchema, loginSchema } from '../validations/auth.schemas';

const router = Router();

router.post('/register', async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ errors: result.error.issues });

  try {
    const { user, token } = await register(result.data);

    // Retorna só o que queremos
    res.status(201).json({ 
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      token
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ errors: result.error.issues });

  try {
    const { user, token } = await login(result.data);

    res.json({ 
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      token
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
