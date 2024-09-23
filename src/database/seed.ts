import { userSeeder } from './seeders/userSeeder';

(async () => {
	try {
		// Seed the database
		await userSeeder();
		console.log('Seeding completed successfully');
	} catch (error) {
		console.error('Seeding failed:', error);
	}
})();
