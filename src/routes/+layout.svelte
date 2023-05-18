<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.css';

	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			shadow="shadow-x1"
			gridColumns="grid-cols-2"
			slotDefault="place-self-end"
			slotTrail="place-content-end"
		>
			Todo app
			<svelte:fragment slot="trail">
				<LightSwitch rounded="rounded-xl" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
