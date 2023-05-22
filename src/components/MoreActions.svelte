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
<div class="btn-group variant-filled-secondary">
	<button on:click={onCheckAll} disabled={todos.length === 0}
		>{completed ? 'Check' : 'Uncheck'} all</button
	>
	<button on:click={onRemoveCompleted} disabled={completedTodos === 0}>Remove completed</button>
</div>
