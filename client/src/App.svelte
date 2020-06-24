<script>
	import * as L from 'leaflet';
	import { onMount } from 'svelte';
	import Login from './Login.svelte';
	onMount(async () => {
		const map = L.map('map', {
			center: [43.0, -79.0],
			zoom: 9,
		});

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		map.invalidateSize();
	});
</script>

<style>
	main {
		position: relative;
	}
</style>

<main>
	<div id="map" />
	<Login />
</main>
