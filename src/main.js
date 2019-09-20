import Vue from 'vue'
import App from './App.vue'
import { VTooltip } from 'v-tooltip'
Vue.directive('tooltip', VTooltip)

Vue.config.productionTip = false

Vue.filter('numberFormat', function (value, decimals) {
  value = (!value?0:value);
  decimals = (!decimals?0:decimals);
  const rounded =  Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return '$ '+rounded.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});

new Vue({
  render: h => h(App),
}).$mount('#app')
