<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { selectOnFocus, focusOnInit } from '$lib/actions';

	const dispatch = createEventDispatcher();

	let name = '';
	let nameEl: HTMLInputElement;

	function addTodo() {
		dispatch('addTodo', { name });
		name = '';
		nameEl.focus();
	}

	function onCancel() {
		name = '';
		nameEl.focus();
	}
</script>

<!-- NewTodo -->
<form on:submit|preventDefault={addTodo} on:keydown={(e) => e.key === 'Escape' && onCancel()}>
	<h2 class="m-0 text-center">
		<label for="todo-0" class="text-2xl font-normal leading-tight mb-4">
			What needs to be done?
		</label>
	</h2>
	<input
		bind:value={name}
		bind:this={nameEl}
		use:selectOnFocus
		use:focusOnInit
		type="text"
		id="todo-0"
		autocomplete="off"
		class="input text-2xl font-normal p-4 mb-4"
	/>
	<button type="submit" disabled={!name} class="btn variant-filled w-full"> Add </button>
</form>
