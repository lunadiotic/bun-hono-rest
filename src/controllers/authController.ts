import type { Context } from 'hono';
import { AuthService } from '../services/authService';
import { registerValidator, loginValidator } from '../validators/authValidator';
import { handleError } from '../utils/handlerError';

export class AuthController {
	static async register(ctx: Context) {
		const { username, email, password } = await ctx.req.json();

		// Validate input
		try {
			registerValidator.parse({ username, email, password });
		} catch (error) {
			return handleError(ctx, error, 400);
		}

		// Register new user
		try {
			const { token } = await AuthService.register(username, email, password);
			return ctx.json({ token });
		} catch (error) {
			return handleError(ctx, error, 400);
		}
	}

	static async login(ctx: Context) {
		const { email, password } = await ctx.req.json();

		// Validate input
		try {
			loginValidator.parse({ email, password });
		} catch (error) {
			return handleError(ctx, error, 400);
		}

		try {
			const result = await AuthService.login(email, password);
			return ctx.json(result);
		} catch (error) {
			return handleError(ctx, error, 400);
		}
	}
}
