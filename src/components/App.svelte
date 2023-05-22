<script lang="ts">
	import Todos from './Todos.svelte';
	import Alert from './Alert.svelte';
	import { todos } from '$lib/stores';
</script>

<!-- <Alert /> -->
<Todos bind:todos={$todos} />

<style>
</style>
