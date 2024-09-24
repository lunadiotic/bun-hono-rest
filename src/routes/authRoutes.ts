import { Hono } from 'hono';
import { AuthController } from '../controllers/authController';

const authRoute = new Hono();

authRoute.post('/register', AuthController.register);

export default authRoute;
