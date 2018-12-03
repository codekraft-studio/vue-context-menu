import Vue from 'vue'
import App from './App.vue'
import VueContextMenu from './components/index'

Vue.config.productionTip = false

Vue.use(VueContextMenu)
new Vue({
  render: h => h(App),
}).$mount('#app')
