import { writable, type Writable } from 'svelte/store';
import { localStore } from './localstore';

export const alert: Writable<string> = writable('Welcome to the to-do list app!');

const initialTodos = [
	{ id: 1, name: 'Visit MDN web docs', completed: true },
	{ id: 2, name: 'Complete the Svelte Tutorial', completed: false }
];

export const todos = localStore('mdn-svelte-todo', initialTodos);
