import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export function localStore(
	key: string,
	initial: { id: number; name: string; completed: boolean }[]
) {
	function toString(value: { id: number; name: string; completed: boolean }[]) {
		return JSON.stringify(value, null, 2);
	}
	const toObj = JSON.parse;

	if (browser) {
		if (localStorage.getItem(key) == null) localStorage.setItem(key, toString(initial));

		const saved = toObj(localStorage.getItem(key)!);

		const { subscribe, set, update } = writable(saved);

		return {
			subscribe,
			set(value: { id: number; name: string; completed: boolean }[]) {
				localStorage.setItem(key, toString(value));
				return set(value);
			},
			update
		};
	}
}
