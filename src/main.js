import { createApp } from "vue";
import App from "./App.vue";
import "./styles/main.css";

document.documentElement.style.setProperty(
  "--landing-image",
  `url("${import.meta.env.BASE_URL}images/fond_lyon.jpg")`,
);

createApp(App).mount("#vue-runtime");
