// import { worker } from './_mock';
// worker.start({ onUnhandledRequest: 'bypass' });
import { createApp } from 'vue';

import App from './App.vue';
import './assets/main.css';

const app = createApp(App);

app.mount('#app');
