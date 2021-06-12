// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
// background is white, because vendor is isolated from app, thus app's variables
// dont leak into vendor


import App from "./App";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app')
