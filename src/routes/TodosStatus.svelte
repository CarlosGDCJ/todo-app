<script lang="ts">
	export let todos: { id: number; name: string; completed: boolean }[];

	export function focus() {
		headingEl.focus();
	}

	let headingEl: HTMLHeadingElement;

	$: totalTodos = todos.length;
	$: completedTodos = todos.filter((t) => t.completed).length;
</script>

<!-- TodosStatus -->
<h2 id="list-heading" bind:this={headingEl} tabindex="-1">
	{completedTodos} out of {totalTodos} items completed
</h2>
