import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { JsonValue } from '../types/json.type';

export function localStore(key: string, initial: JsonValue) {
	function toString(value: JsonValue) {
		return JSON.stringify(value, null, 2);
	}
	const toObj = JSON.parse;

	if (browser) {
		if (localStorage.getItem(key) === null) localStorage.setItem(key, toString(initial));

		const saved = toObj(localStorage.getItem(key)!);

		const { subscribe, set, update } = writable(saved);

		return {
			subscribe,
			set(value: JsonValue) {
				localStorage.setItem(key, toString(value));
				return set(value);
			},
			update
		};
	}
}
