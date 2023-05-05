<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';
	import { focusOnInit, selectOnFocus } from '$lib/actions';
	export let todo: { id: number; name: string; completed: boolean };

	const dispatch = createEventDispatcher();

	let editing: boolean = false;
	let name: string = todo.name;
	let nameEl: HTMLInputElement;
	let editButtonPressed = false;

	function update(updatedTodo: { id?: number; name?: string; completed?: boolean }) {
		console.log('Todo: ', todo);
		console.log('updatedTodo: ', updatedTodo);
		console.log('Combined: ', { ...todo, ...updatedTodo });
		dispatch('update', { todo: { ...todo, ...updatedTodo } });
	}

	function onCancel() {
		name = todo.name;
		editing = false;
	}

	function onSave() {
		update({ name });
		editing = false;
	}

	function onRemove() {
		dispatch('remove', { todo });
	}

	function onEdit() {
		editButtonPressed = true;
		editing = true;
	}

	function onToggle() {
		update({ completed: !todo.completed });
	}

	function focusEditButton(node: HTMLButtonElement) {
		if (editButtonPressed) {
			node.focus();
		}
	}
</script>

<div class="stack-small">
	{#if editing}
		<form
			on:submit|preventDefault={onSave}
			class="stack-small"
			on:keydown={(e) => e.key === 'Escape' && onCancel()}
		>
			<div class="form-group">
				<label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
				<input
					bind:value={name}
					bind:this={nameEl}
					use:selectOnFocus
					use:focusOnInit
					id="todo-{todo.id}"
					type="text"
					autocomplete="off"
					class="todo-text"
				/>
			</div>
			<div class="btn-group">
				<button type="button" class="btn todo-cancel" on:click={onCancel}
					>Cancel<span class="visually-hidden">renaming {todo.name}</span></button
				>
				<button type="submit" class="btn btn__primary todo-edit" disabled={!name}
					>Save<span class="visually-hidden">new name for {todo.name}</span></button
				>
			</div>
		</form>
	{:else}
		<div class="c-cb">
			<input type="checkbox" id="todo-{todo.id}" on:click={onToggle} checked={todo.completed} />
			<label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
		</div>
		<div class="btn-group">
			<button type="button" class="btn" on:click={onEdit} use:focusEditButton>
				Edit <span class="visually-hidden">{todo.name}</span>
			</button>
			<button type="button" class="btn btn__danger" on:click={onRemove}>
				Delete <span class="visually-hidden">{todo.name}</span>
			</button>
		</div>
	{/if}
</div>