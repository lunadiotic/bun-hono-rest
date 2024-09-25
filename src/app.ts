import { Hono } from 'hono';
import authRoute from './routes/authRoutes';
import adminRoute from './routes/adminRoutes';

// Create a new Hono app with the base path set to /api
const app = new Hono().basePath('/api');

app.get('/', (c) => {
	return c.text('Hello, World!');
});

app.route('/auth', authRoute);
app.route('/admin', adminRoute);

// Add a 404 handler
app.notFound((c) => {
	c.status(404);
	return c.json({
		errors: true,
		message: 'Endpoint not found',
	});
});

// Add a default error handler
app.onError((err, c) => {
	console.error(`${err}`);
	c.status = c.status || 500;
	err.message = err.message || 'Internal Server Error';
	return c.json({
		errors: true,
		message: err.message,
	});
});

// Set the port to 3000
export default {
	port: process.env.PORT || 3000,
	fetch: app.fetch,
};
