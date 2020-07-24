<script>
	import { createEventDispatcher } from 'svelte';

	export let image;
	let hovered;
	const dispatch = createEventDispatcher();

	function onDeleteclick() {
		dispatch('delete');
	}
</script>

<style>
	.image {
	}
	.image-overlay {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0);
	}
	.image-overlay:hover {
		background: rgba(0, 0, 0, 0.8);
		transition: 0.2s;
	}
</style>

<div class="image">
	<img src={image} alt="something interesting (maybe with Ai :p)" />

	<div
		class="image-overlay"
		on:mouseout={() => (hovered = false)}
		on:mouseover={() => (hovered = true)}>
		<button
			class="button is-rounded"
			style={hovered ? 'display:block' : 'display:none'}
			on:click={onDeleteclick}>
			Delete me
		</button>
	</div>

</div>
