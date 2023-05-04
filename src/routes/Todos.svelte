<script lang="ts">
	import FilterButton from './FilterButton.svelte';
	import MoreActions from './MoreActions.svelte';
	import Todo from './Todo.svelte';

	export let todos: { id: number; name: string; completed: boolean }[] = [];

	$: totalTodos = todos.length;
	$: completedTodos = todos.filter((t) => t.completed).length;

	let newTodoName = '';

	let newTodoId: number;
	$: {
		if (totalTodos === 0) {
			newTodoId = 1;
		} else {
			newTodoId = Math.max(...todos.map((t) => t.id)) + 1;
		}
	}

	let filter = 'all';
	function filterTodos(filter: string, todos: { id: number; name: string; completed: boolean }[]) {
		return filter === 'active'
			? todos.filter((t) => !t.completed)
			: filter === 'completed'
			? todos.filter((t) => t.completed)
			: todos;
	}

	function removeTodo(todo: { id: number; name: string; completed: boolean }) {
		todos = todos.filter((t) => t.id !== todo.id);
	}

	function updateTodo(todo: { id: number; name: string; completed: boolean }) {
		const i = todos.findIndex((t) => t.id === todo.id);
		todos[i] = { ...todos[i], ...todo };
	}

	function addTodo() {
		todos = [...todos, { id: newTodoId, name: newTodoName, completed: false }];
		newTodoName = '';
	}

	function checkAll(completed: boolean) {
		// console.log('Before: ');
		// console.log(JSON.parse(JSON.stringify(todos)));
		todos = todos.map((t) => ({ ...t, completed }));
		// console.log('After: ');
		// console.log(JSON.parse(JSON.stringify(todos)));
	}

	function removeCompletedTodos() {
		todos = todos.filter((t) => !t.completed);
	}
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">
	<!-- NewTodo -->
	<form on:submit|preventDefault={addTodo}>
		<h2 class="label-wrapper">
			<label for="todo-0" class="label__lg"> What needs to be done? </label>
		</h2>
		<input
			type="text"
			id="todo-0"
			autocomplete="off"
			class="input input__lg"
			bind:value={newTodoName}
		/>
		<button type="submit" disabled="" class="btn btn__primary btn__lg"> Add </button>
	</form>

	<FilterButton bind:filter />

	<!-- TodosStatus -->
	<h2 id="list-heading">{completedTodos} out of {totalTodos} items completed</h2>

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
