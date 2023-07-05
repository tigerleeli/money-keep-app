
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.component('cu-custom', cuCustom)

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif