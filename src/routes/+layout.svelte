<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.css';

	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<AppBar>
		<h3 class="text-center">Todo App</h3>
	</AppBar>
	<slot />
</AppShell>
