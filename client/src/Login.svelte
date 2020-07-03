<script>
	import { fade } from 'svelte/transition';
	import { isLoggedIn, token } from './stores.js';

	let email = '';
	let dangerClass = ''; // "is-danger" if not valid

	const submit = async () => {
		// isLoggedIn.set(true);

		if (email === '') {
			dangerClass = 'is-danger';
			return;
		}
		try {
			const result = await fetch('http://localhost:3000/user?email=' + email, {
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((res) => res.json());
			console.log(result);
			if (result.token) {
				console.log('Logged in');
				token.set(result.token);
				localStorage.setItem('token', result.token);
				isLoggedIn.set(true);
			}
		} catch (err) {
			// TODO: Show error on screen
			console.log(err);
		}
	};

	const signup = async () => {
		if (email === '') {
			dangerClass = 'is-danger';
			return;
		}
		try {
			const result = await fetch('http://localhost:3000/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			}).then((res) => res.json());
			console.log(result);
			if (result.token) {
				console.log('Logged in');
				token.set(result.token);
				localStorage.setItem('token', result.token);
				isLoggedIn.set(true);
			}
		} catch (err) {
			// TODO: Show error on screen
			console.log(err);
		}
	};
</script>

<style>
	.overlay {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		backdrop-filter: blur(3px);
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.box {
		pointer-events: all;
		width: 30%;
		background-color: #f2efea;
	}

	.title {
		color: #fc7753;
		font-size: 4rem;
	}

	.subtitle {
		font-size: 1.5rem;
	}

	.button {
		background-color: #08415c;
	}
</style>

<div class="overlay" out:fade>
	<div class="box">
		<section class="hero">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">Travel Log</h1>
					<h3 class="subtitle">Save your memories</h3>
				</div>
			</div>
		</section>
		<div class="field">
			<label class="label">Email</label>
			<div class="control">
				<input
					class="input {dangerClass}"
					type="email"
					placeholder="Email input"
					bind:value={email} />
			</div>
			{#if dangerClass != ''}
				<p class="help is-danger">This email is invalid</p>
			{/if}
		</div>
		<div class="field is-grouped">
			<div class="control">
				<button class="button is-link" on:click={submit}>Login</button>
			</div>
			<div class="control button-container">
				<button class="button is-link" on:click={signup}>Sign Up</button>
			</div>

		</div>
	</div>
</div>
