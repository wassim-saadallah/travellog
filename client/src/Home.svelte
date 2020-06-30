<script>
	import { map as _map } from './stores.js';

	let sideMenuOpen = false;
	let lat = 0,
		lng = 0; // tracking mouse position

	let name = 'New Title';

	function onclick(evt) {
		sideMenuOpen = !sideMenuOpen;
	}

	function onContextMenu(latlng, map) {
		sideMenuOpen = true;
		map.flyTo(latlng, 13);
	}

	const unsubscribe = _map.subscribe((map) => {
		console.log(map);
		if (map) {
			map.addEventListener('mousemove', function (ev) {
				lat = ev.latlng.lat;
				lng = ev.latlng.lng;
			});
			map.addEventListener('contextmenu', ({ latlng }) => onContextMenu(latlng, map));
		}
	});
</script>

<style>
	.overlay {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		display: flex;
		align-items: flex-start;
		pointer-events: none;
	}

	.box {
		pointer-events: all;
		height: 100%;
		width: 20vw;
		margin-left: -20vw;
		transition: 0.5s;
	}

	.sideMenuOpen {
		margin-left: 0px;
		transition: 1s;
	}

	.button {
		pointer-events: all;
		margin: 5px 0px 0px 10px;
	}

	.title {
		padding: 0.5em;
	}
</style>

<div class="overlay">
	<div class={'box' + (sideMenuOpen ? ' sideMenuOpen' : '')}>
		<aside class="menu">
			<h3 class="title is-3" contenteditable="true" bind:innerHTML={name}>New Title</h3>
			<ul class="menu-list">
				<li>
					<div class="field">
						<label class="label">Description</label>
						<div class="control">
							<textarea class="textarea" placeholder="Textarea" />
						</div>
					</div>
				</li>
				<li>
					<a href="/">Customers</a>
				</li>
			</ul>
			<p class="menu-label">Administration</p>
			<ul class="menu-list">
				<li>
					<a href="/">Team Settings</a>
				</li>
				<li>
					<a href="/">Manage Your Team</a>
					<ul>
						<li>
							<a href="/">Members</a>
						</li>
						<li>
							<a href="/">Plugins</a>
						</li>
						<li>
							<a href="/">Add a member</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="/">Invitations</a>
				</li>
				<li>
					<a href="/">Cloud Storage Environment Settings</a>
				</li>
				<li>
					<a href="/">Authentication</a>
				</li>
			</ul>
			<p class="menu-label">Transactions</p>
			<ul class="menu-list">
				<li>
					<a href="/">Payments</a>
				</li>
				<li>
					<a href="/">Transfers</a>
				</li>
				<li>
					<a href="/">Balance</a>
				</li>
			</ul>
		</aside>
	</div>
	<button class="button is-rounded" on:click={onclick}>
		<img alt="menu" src="https://img.icons8.com/material-sharp/24/000000/menu.png" />
	</button>
</div>
