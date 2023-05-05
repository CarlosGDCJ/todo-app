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
	<h2 class="label-wrapper">
		<label for="todo-0" class="label__lg"> What needs to be done? </label>
	</h2>
	<input
		bind:value={name}
		bind:this={nameEl}
		use:selectOnFocus
		use:focusOnInit
		type="text"
		id="todo-0"
		autocomplete="off"
		class="input input__lg"
	/>
	<button type="submit" disabled={!name} class="btn btn__primary btn__lg"> Add </button>
</form>
