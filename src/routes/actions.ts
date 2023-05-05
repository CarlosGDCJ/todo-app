export function selectOnFocus(node: HTMLInputElement) {
	const onFocus = () => node.select();
	node.addEventListener('focus', onFocus);

	return {
		destroy() {
			node.removeEventListener('focus', onFocus);
		}
	};
}
