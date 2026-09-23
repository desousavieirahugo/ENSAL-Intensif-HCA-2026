import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import './legacy/app.js'

const runtimeRoot = document.getElementById('vue-runtime')

if (runtimeRoot) {
  createApp(App).mount(runtimeRoot)
}
