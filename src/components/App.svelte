<script lang="ts">
	import Todos from './Todos.svelte';
	import Alert from './Alert.svelte';

	let todos = [
		{ id: 1, name: 'Create a Svelte starter app', completed: true },
		{ id: 2, name: 'Create your first component', completed: true },
		{ id: 3, name: 'Complete the rest of the tutorial', completed: false }
	];
</script>

<Alert />
<Todos {todos} />

<style>
</style>
