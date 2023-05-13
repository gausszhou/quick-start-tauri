import { createApp } from "vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./styles/index.css";
import "./styles/element-plus/el-tabs.css";
import "./styles/gauss-ui/g-menu.css";
import "./styles/gauss-ui/g-divider.css";
import App from "./App.vue";

const container = document.getElementById("vue-app") as HTMLDivElement
const app = createApp(App);
app.mount(container);