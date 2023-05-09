import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { TodoType } from '../types/todo.type';

export function localStore(key: string, initial: TodoType[]) {
	function toString(value: TodoType[]) {
		return JSON.stringify(value, null, 2);
	}
	const toObj = JSON.parse;

	if (browser) {
		if (localStorage.getItem(key) == null) localStorage.setItem(key, toString(initial));

		const saved = toObj(localStorage.getItem(key)!);

		const { subscribe, set, update } = writable(saved);

		return {
			subscribe,
			set(value: TodoType[]) {
				localStorage.setItem(key, toString(value));
				return set(value);
			},
			update
		};
	}
}
