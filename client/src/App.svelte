<script>
  import * as L from "leaflet";
  import { onMount } from "svelte";
  onMount(async () => {
    const map = L.map("map", {
      center: [43.00, -79.00],
      zoom: 9,
    })
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    
    map.invalidateSize()
  })

</script>

<style>
  main {
    width: 100%;
    height: 100%;
  }
</style>

<main id="map"></main>