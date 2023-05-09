<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import FilterButton from './FilterButton.svelte';
	import MoreActions from './MoreActions.svelte';
	import NewTodo from './NewTodo.svelte';
	import Todo from './Todo.svelte';
	import TodosStatus from './TodosStatus.svelte';
	import { alert } from '$lib/stores';

	export let todos: { id: number; name: string; completed: boolean }[] = [];

	let newTodoId: number;
	$: {
		if (todos.length === 0) {
			newTodoId = 1;
		} else {
			newTodoId = Math.max(...todos.map((t) => t.id)) + 1;
		}
	}

	let todosStatus: SvelteComponent;

	let filter = 'all';
	$: {
		if (filter === 'all') {
			$alert = 'Browsing all todos';
		} else if (filter === 'active') {
			$alert = 'Browsing active todos';
		} else if (filter === 'completed') {
			$alert = 'Browsing completed todos';
		}
	}
	function filterTodos(filter: string, todos: { id: number; name: string; completed: boolean }[]) {
		return filter === 'active'
			? todos.filter((t) => !t.completed)
			: filter === 'completed'
			? todos.filter((t) => t.completed)
			: todos;
	}

	function removeTodo(todo: { id: number; name: string; completed: boolean }) {
		todos = todos.filter((t) => t.id !== todo.id);
		$alert = `Todo named '${todo.name}' has been deleted`;
		todosStatus.focus();
	}

	function updateTodo(todo: { id: number; name: string; completed: boolean }) {
		const i = todos.findIndex((t) => t.id === todo.id);

		if (todos[i].name !== todo.name) $alert = `Todo '${todos[i].name}' renamed to '${todo.name}'`;
		if (todos[i].completed !== todo.completed)
			$alert = `Todo '${todos[i].name}' marked as ${todo.completed ? 'completed' : 'active'}`;

		todos[i] = { ...todos[i], ...todo };
	}

	function addTodo(name: string) {
		todos = [...todos, { id: newTodoId, name, completed: false }];
		$alert = `Todo named '${name}' has been added`;
	}

	function checkAll(completed: boolean) {
		todos = todos.map((t) => ({ ...t, completed }));
		$alert = `${completed ? 'Checked' : 'Unchecked'} ${todos.length} todos`;
	}

	function removeCompletedTodos() {
		let numTodos = todos.length;
		todos = todos.filter((t) => !t.completed);
		$alert = `Removed ${numTodos - todos.length} todos`;
		todosStatus.focus();
	}
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">
	<NewTodo on:addTodo={(e) => addTodo(e.detail.name)} />
	<FilterButton bind:filter />

	<TodosStatus {todos} bind:this={todosStatus} />

	<!-- Todos -->
	<ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
		{#each filterTodos(filter, todos) as todo, i (todo.id)}
			<li class="todo">
				<Todo
					{todo}
					on:remove={(e) => removeTodo(e.detail.todo)}
					on:update={(e) => updateTodo(e.detail.todo)}
				/>
			</li>
		{:else}
			Nothing to do here
		{/each}
	</ul>

	<hr />

	<MoreActions
		{todos}
		on:checkAll={(e) => checkAll(e.detail.completed)}
		on:removeCompleted={removeCompletedTodos}
	/>
</div>
