import type { Context } from 'hono';

export const handleError = (ctx: Context, error: unknown, statusCode: any) => {
	if (error instanceof Error) {
		return ctx.json({ error: error.message }, statusCode);
	} else {
		return ctx.json({ error: 'Unknown error occurred' }, 500);
	}
};
