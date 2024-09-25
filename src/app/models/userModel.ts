import { eq } from 'drizzle-orm/expressions';
import { userSchema } from '../../database/schemas/userSchema';
import { db } from '../../config/db';

export class UserModel {
	// Create new user
	static async createUser(username: string, email: string, password: string) {
		await db
			.insert(userSchema)
			.values({
				username,
				email,
				password,
			})
			.run();
	}

	// Find user by email
	static async findUserByEmail(email: string) {
		return db
			.select()
			.from(userSchema)
			.where(eq(userSchema.email, email))
			.get();
	}

	// Find user by reset password token
	static async findUserByResetToken(token: string) {
		return db
			.select()
			.from(userSchema)
			.where(eq(userSchema.resetPasswordToken, token))
			.get();
	}

	// Update user password
	static async updateUserPassword(userId: number, newPassword: string) {
		await db
			.update(userSchema)
			.set({
				password: newPassword,
				resetPasswordToken: null,
				resetPasswordExpires: null,
			})
			.where(eq(userSchema.id, userId))
			.run();
	}
}
