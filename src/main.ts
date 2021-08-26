import App from "./App.vue";
import store from "@/store";
import Vue, { VNode } from "vue";

Vue.config.productionTip = false;

new Vue({
    render: (render): VNode => render(App),
    store,
}).$mount("#app");
