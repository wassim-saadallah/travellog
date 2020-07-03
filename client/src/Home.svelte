<script>
	import { claim_component } from 'svelte/internal';

	import VirtualList from '@sveltejs/svelte-virtual-list';
	import Image from './Image.svelte';

	import { map as _map } from './stores.js';

	let sideMenuOpen = false;
	let lat = 0,
		lng = 0; // tracking mouse position

	let name = 'New Title';
	let description = '';
	let inputs;
	let imageUrls = [];

	async function readImg(image) {
		return new Promise((resolve, reject) => {
			let f = new FileReader();
			f.onloadend = (event) => resolve(event.target.result);
			f.onerror = (err) => reject(err);
			f.readAsDataURL(image);
		});
	}

	function onclick(evt) {
		sideMenuOpen = !sideMenuOpen;
	}

	function onContextMenu(latlng, map) {
		sideMenuOpen = true;
		map.flyTo(latlng, 13);
	}

	async function onInput() {
		for (let i = 0; i < inputs.length; i++) {
			imageUrls.push({ index: i, value: await readImg(file) });
			imageUrls = imageUrls; // to trigger $invalidate (change detection)
		}
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

	.menu {
		display: flex;
		flex-flow: column;
		height: 100%;
	}

	.v-list {
		flex-grow: 1;
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
							<textarea class="textarea" placeholder="Textarea" bind:value={description} />
						</div>
					</div>
				</li>
				<li>
					<div class="file">
						<label class="file-label">
							<input
								class="file-input"
								type="file"
								name="resume"
								bind:files={inputs}
								on:change={onInput}
								accept=".jpg, .jpeg, .png"
								multiple="true" />
							<span class="file-cta">
								<span class="file-label">Choose a file…</span>
							</span>
						</label>
					</div>
				</li>
			</ul>
			<VirtualList items={imageUrls} let:item class="v-list">
				<Image on:delete={console.log} />
				<img src={item} alt="i don't know" class="image" />
			</VirtualList>
		</aside>
	</div>
	<button class="button is-rounded" on:click={onclick}>
		<img alt="menu" src="https://img.icons8.com/material-sharp/24/000000/menu.png" />
	</button>
</div>
