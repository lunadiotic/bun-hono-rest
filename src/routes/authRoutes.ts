import { Hono } from 'hono';
import { AuthController } from '../app/controllers/authController';

const authRoute = new Hono();

authRoute.post('/register', AuthController.register);
authRoute.post('/login', AuthController.login);

export default authRoute;
