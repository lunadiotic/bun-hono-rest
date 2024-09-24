import { UserModel } from '../models/userModel';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthService {
	// Register new user
	static async register(username: string, email: string, password: string) {
		// Hash password
		const hashedPassword = await Bun.password.hash(password);

		// Check if user already exists
		const existingUser = await UserModel.findUserByEmail(email);
		if (existingUser) {
			throw new Error('User already exists');
		}

		// Create new user (using model)
		await UserModel.createUser(username, email, hashedPassword);

		// Generate JWT token
		const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
		return { token };
	}
}
