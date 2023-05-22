<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';
	import { focusOnInit, selectOnFocus } from '$lib/actions';
	import type { TodoType } from '../types/todo.type';
	export let todo: TodoType;

	const dispatch = createEventDispatcher();

	let editing: boolean = false;
	let name: string = todo.name;
	let nameEl: HTMLInputElement;
	let editButtonPressed = false;

	function update(updatedTodo: Partial<TodoType>) {
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

<div class="space-y-2 my-4">
	{#if editing}
		<form on:submit|preventDefault={onSave} on:keydown={(e) => e.key === 'Escape' && onCancel()}>
			<div class="form-group">
				<label for="todo-{todo.id}" class="font-normal text-lg">New name for '{todo.name}:'</label>
				<input
					bind:value={name}
					bind:this={nameEl}
					use:selectOnFocus
					use:focusOnInit
					id="todo-{todo.id}"
					type="text"
					autocomplete="off"
					class="input font-normal my-2"
				/>
			</div>
			<div class="w-full grid grid-cols-2">
				<button type="button" class="btn variant-filled-error mr-1" on:click={onCancel}
					>Cancel<span class="visually-hidden">renaming {todo.name}</span></button
				>
				<button type="submit" class="btn variant-filled-success ml-1" disabled={!name}
					>Save<span class="visually-hidden">new name for {todo.name}</span></button
				>
			</div>
		</form>
	{:else}
		<div class="space-x-1">
			<input
				class="checkbox w-[44px] h-[44px]"
				type="checkbox"
				id="todo-{todo.id}"
				on:click={onToggle}
				checked={todo.completed}
			/>
			<label for="todo-{todo.id}" class="label inline-block font-normal text-lg align-middle"
				>{todo.name}</label
			>
		</div>
		<div class="w-full grid grid-cols-2">
			<button
				type="button"
				class="btn variant-filled-primary col-span1 mr-1"
				on:click={onEdit}
				use:focusEditButton
			>
				Edit <span class="visually-hidden">{todo.name}</span>
			</button>
			<button type="button" class="btn variant-filled-error col-span-1 ml-1" on:click={onRemove}>
				Delete <span class="visually-hidden">{todo.name}</span>
			</button>
		</div>
	{/if}
</div>

<style>
	.visually-hidden {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px 1px 1px 1px);
		clip: rect(1px, 1px, 1px, 1px);
		white-space: nowrap;
	}
</style>
