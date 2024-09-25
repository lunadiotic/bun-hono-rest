import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { JWT_SECRET } from '../../config/jwt';
import { UserRepository } from '../repositories/UserRepository';

export class AuthService {
	// Register new user
	static async register(username: string, email: string, password: string) {
		// Hash password
		const hashedPassword = await Bun.password.hash(password);

		// Check if user already exists
		const existingUser = await UserRepository.findUserByEmail(email);
		if (existingUser) {
			throw new Error('User already exists');
		}

		// Create new user (using model)
		await UserRepository.createUser(username, email, hashedPassword);

		// Generate JWT token
		const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
		return { token };
	}

	// Login user
	static async login(email: string, password: string) {
		const user = await UserRepository.findUserByEmail(email);
		if (!user) {
			throw new Error('Invalid email or password');
		}

		// Verifikasi password dengan Bun.password
		const isPasswordValid = await Bun.password.verify(password, user.password);
		if (!isPasswordValid) {
			throw new Error('Invalid email or password');
		}

		const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: '1h',
		});
		return { token };
	}
}
