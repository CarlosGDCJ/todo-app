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
<div class="btn-group">
	<button type="button" on:click={onCheckAll} class="btn btn__primary" disabled={todos.length === 0}
		>{completed ? 'Check' : 'Uncheck'} all</button
	>
	<button
		type="button"
		on:click={onRemoveCompleted}
		class="btn btn__primary"
		disabled={completedTodos === 0}>Remove completed</button
	>
</div>
