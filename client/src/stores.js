import { writable } from 'svelte/store';

export let isLoggedIn = writable(false);
export let token = writable('');
export let map = writable(undefined);


