import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// User schema
export const userSchema = sqliteTable('users', {
	id: integer('id').primaryKey(),
	username: text('username').notNull().unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	resetPasswordToken: text('reset_password_token'),
	resetPasswordExpires: integer('reset_password_expires'),
});
