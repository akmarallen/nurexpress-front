// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import Vuetify from 'vuetify';
import VueInputMask from "vue-inputmask";
import { required } from 'vee-validate/dist/rules';
import axios from 'axios';
import JsonExcel from 'vue-json-excel';
import barcode from 'tui-vue-barcode'
Vue.component('barcode', barcode)

Vue.component('downloadExcel', JsonExcel)

extend('required', {
  ...required,
  message: '{_field_} - сөзсүз киргизиш керек!'
});

Vue.use(VueInputMask.default)
Vue.use(Vuetify);
const opts = {}
export default new Vuetify(opts)

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;


axios.interceptors.response.use(
    response=>{
      return response;
    },
    err=> {
      const {
        config,
        response: {status, data}
      } = err;

    if(status === 401 ||status === 403)
    {
        localStorage.removeItem('currentUser');
        router.push('../pages/Login');
    }
  }
);



new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
