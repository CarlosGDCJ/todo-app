export const focusOnInit = (node: HTMLInputElement) => node && node.focus();

export function selectOnFocus(node: HTMLInputElement) {
	if (node) {
		const onFocus = () => node.select();
		node.addEventListener('focus', onFocus);

		return {
			destroy() {
				node.removeEventListener('focus', onFocus);
			}
		};
	}
}
