<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { Filter } from '../types/filter.enum';
	export let filter: Filter = Filter.ALL;
</script>

<!-- Filter -->
<RadioGroup
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	display="flex"
	spacing="space-x-10 px-2"
>
	<RadioItem bind:group={filter} name="all" value={Filter.ALL}>
		<span class="visually-hidden">Show</span>
		<span>All</span>
		<span class="visually-hidden">tasks</span>
	</RadioItem>
	<RadioItem bind:group={filter} name="completed" value={Filter.COMPLETED}>
		<span class="visually-hidden">Show</span>
		<span>Completed</span>
		<span class="visually-hidden">tasks</span>
	</RadioItem>
	<RadioItem bind:group={filter} name="active" value={Filter.ACTIVE}>
		<span class="visually-hidden">Show</span>
		<span>Active</span>
		<span class="visually-hidden">tasks</span>
	</RadioItem>
</RadioGroup>

<style>
	.visually-hidden {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px 1px 1px 1px);
		clip: rect(1px, 1px, 1px, 1px);
		white-space: nowrap;
	}
</style>
