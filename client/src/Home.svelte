<script>
	import { map as _map } from './stores.js';

	let sideMenuOpen = false;
	let lat = 0, lng = 0; // tracking mouse position

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
			map.addEventListener('mousemove', function(ev) {
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
		margin-left: calc(-20vw); 
		transition: 1s;
  }

	.sideMenuOpen {
		margin-left: 0px;
		transition: 1s;
	}

  .button {
    pointer-events: all;
		margin: 5px 0px 0px 10px;
  }
</style>

<div class="overlay">
	<div class={ 'box' + (sideMenuOpen ? ' sideMenuOpen' : '') }>
    <aside class="menu">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li><a class="is-active">Dashboard</a></li>
        <li><a>Customers</a></li>
      </ul>
      <p class="menu-label">
        Administration
      </p>
      <ul class="menu-list">
        <li><a>Team Settings</a></li>
        <li>
          <a>Manage Your Team</a>
          <ul>
            <li><a>Members</a></li>
            <li><a>Plugins</a></li>
            <li><a>Add a member</a></li>
          </ul>
        </li>
        <li><a>Invitations</a></li>
        <li><a>Cloud Storage Environment Settings</a></li>
        <li><a>Authentication</a></li>
      </ul>
      <p class="menu-label">
        Transactions
      </p>
      <ul class="menu-list">
        <li><a>Payments</a></li>
        <li><a>Transfers</a></li>
        <li><a>Balance</a></li>
      </ul>
    </aside>
  </div>
	<button class="button is-rounded" on:click={onclick}><img src="https://img.icons8.com/material-sharp/24/000000/menu.png"/></button>
</div>
