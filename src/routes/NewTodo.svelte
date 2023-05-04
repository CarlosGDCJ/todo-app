<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let autofocus = false;

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

	onMount(() => autofocus && nameEl.focus());
</script>

<!-- NewTodo -->
<form on:submit|preventDefault={addTodo} on:keydown={(e) => e.key === 'Escape' && onCancel()}>
	<h2 class="label-wrapper">
		<label for="todo-0" class="label__lg"> What needs to be done? </label>
	</h2>
	<input
		type="text"
		id="todo-0"
		autocomplete="off"
		class="input input__lg"
		bind:value={name}
		bind:this={nameEl}
	/>
	<button type="submit" disabled={!name} class="btn btn__primary btn__lg"> Add </button>
</form>
