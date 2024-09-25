import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/authMiddleware';
import type { UserContext } from '../types/userContext';

const adminRoute = new Hono();

// Middleware autentikasi diterapkan pada semua endpoint di sini
adminRoute.use('*', authMiddleware);

adminRoute.get('/', (ctx: UserContext) => {
	const user = ctx.get('user');
	if (!user) {
		return ctx.json({ error: 'User not authenticated' }, 401);
	}
	return ctx.json({ message: `Welcome to your dashboard, ${user.email}` });
});

export default adminRoute;
