import jwt from 'jsonwebtoken';
import type { UserContext } from '../types/userContext';
import type { Next } from 'hono';
import { JWT_SECRET } from '../../config/jwt';
import type { User } from '../models/User';

export const authMiddleware = async (ctx: UserContext, next: Next) => {
	const authHeader = ctx.req.header('Authorization');

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return ctx.json({ error: 'Authorization token required' }, 401);
	}

	const token = authHeader.split(' ')[1];

	try {
		// Verifikasi token JWT dan dapatkan payload
		const decoded = jwt.verify(token, JWT_SECRET) as User;

		// Simpan informasi user ke dalam context
		ctx.set('user', decoded);

		// Lanjut ke handler berikutnya
		await next();
	} catch (error) {
		return ctx.json({ error: 'Invalid or expired token' }, 401);
	}
};
