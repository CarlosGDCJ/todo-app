<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TodoType } from '../types/todo.type';

	const dispatch = createEventDispatcher();

	export let todos: TodoType[];

	let completed = true;

	function onCheckAll() {
		dispatch('checkAll', { completed });
		completed = !completed;
	}

	function onRemoveCompleted() {
		dispatch('removeCompleted');
	}

	$: completedTodos = todos.filter((t) => t.completed).length;
</script>

<!-- MoreActions -->
<div class="grid grid-cols-2 mb-2">
	<button
		type="button"
		class="btn variant-filled-secondary col-span-1 mr-1"
		on:click={onCheckAll}
		disabled={todos.length === 0}>{completed ? 'Check' : 'Uncheck'} all</button
	>
	<button
		type="button"
		class="btn variant-filled-secondary col-span-1 ml-1"
		on:click={onRemoveCompleted}
		disabled={completedTodos === 0}>Remove completed</button
	>
</div>
