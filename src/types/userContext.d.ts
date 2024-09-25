import { Context } from 'hono';

export interface UserPayload {
	id: string;
	username: string;
	email: string;
}

export interface UserContext extends Context {
	set(key: 'user', value: UserPayload): void;
	get(key: 'user'): UserPayload | undefined;
}
