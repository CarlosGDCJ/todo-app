import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { JsonValue } from '../types/json.type';

export function localStore<T extends JsonValue>(key: string, initial: T) {
	function toString(value: T) {
		return JSON.stringify(value, null, 2);
	}
	const toObj = JSON.parse;

	if (browser) {
		if (localStorage.getItem(key) === null) localStorage.setItem(key, toString(initial));

		const saved = toObj(localStorage.getItem(key)!);

		const { subscribe, set, update } = writable(saved);

		return {
			subscribe,
			set(value: T) {
				localStorage.setItem(key, toString(value));
				return set(value);
			},
			update
		};
	}
}
