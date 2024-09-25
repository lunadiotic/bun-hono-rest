import { Context } from 'hono';
import type { User } from '../models/User';

export interface UserContext extends Context {
	set(key: 'user', value: User): void;
	get(key: 'user'): User | undefined;
}
