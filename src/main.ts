import '@/styles/index.scss';
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import svgIcon from "./components/svgIcon/index.vue";
import router from "./router/index";
import store from "./store/index";

const app = createApp(App);

app.use(router);

app.component("svg-icon", svgIcon);

app.use(ElementPlus);
app.use(store);
app.mount("#app");
