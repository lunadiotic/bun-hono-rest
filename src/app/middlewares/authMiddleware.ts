import { verify, type JwtPayload } from 'jsonwebtoken';
import type { User } from '../models/User';
import type { Context, Next } from 'hono';

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key'; // Fallback secret

export const authMiddleware = async (c: Context, next: Next) => {
	const authHeader = c.req.header('Authorization');

	if (!authHeader) {
		return c.json({ message: 'Authorization header is missing' }, 401);
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		return c.json({ message: 'Token is missing' }, 401);
	}

	try {
		const decoded = verify(token, SECRET_KEY) as JwtPayload;

		// Safely cast the decoded token to a User-like structure
		const user: Partial<User> = {
			id: decoded.id,
			email: decoded.email,
			username: decoded.username,
		};

		// Attach the user to the context for further use in routes
		c.set('user', user);

		await next();
	} catch (error) {
		return c.json({ message: 'Invalid or expired token' }, 401);
	}
};
