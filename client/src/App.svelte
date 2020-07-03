<script>
	import * as L from 'leaflet';
	import { onMount } from 'svelte';
	import Login from './Login.svelte';
	import Home from './Home.svelte';
	import { isLoggedIn, map as _map } from './stores.js';

	let login_state_value;
	let map;
	let interval = setInterval(() => {
		console.log(window.navigator.onLine);
	}, 500);
	window.addEventListener('keypress', (event) => {
		if (event.key === ' ') clearInterval(interval);
	});

	onMount(() => {
		login_state_value = !localStorage.getItem('token');
		console.log({ login_state_value });
		map = L.map('map', {
			zoomControl: false,
		});
		map.on('load', () => {
			_map.set(map);
		});
		map.setView([43.0, -79.0], 9);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		map.invalidateSize();
	});

	const unsubscribe = isLoggedIn.subscribe((value) => {
		login_state_value = !value;
	});
</script>

<style>
	.map-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	#map {
		width: 100%;
		height: 100%;
		z-index: 0;
	}
</style>

<div class="map-container">
	<div id="map" />
	{#if login_state_value}
		<Login />
	{:else}
		<Home />
	{/if}
</div>
