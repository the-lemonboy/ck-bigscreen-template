// import { worker } from './_mock';
// worker.start({ onUnhandledRequest: 'bypass' });
import { createApp } from 'vue';

import '@/styles/main.css';
import '@/styles/tailwindcss.css';

import App from './App.vue';

const app = createApp(App);

app.mount('#app');
