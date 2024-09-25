import { UserRepository } from '../../app/repositories/UserRepository';

// Data seed
const users = [
	{
		username: 'aim',
		email: 'aima@mail.com',
		password: 'password123',
	},
];

// Function to seed the users table
export const userSeeder = async () => {
	for (const user of users) {
		// Hash the password
		const hashedPassword = await Bun.password.hash(user.password);

		try {
			// Insert the user into the database
			UserRepository.createUser(user.username, user.email, hashedPassword);
			console.log(`Seeded user: ${user.username}`);
		} catch (error) {
			console.error(`Failed to seed user ${user.username}:`, error);
		}
	}
};
