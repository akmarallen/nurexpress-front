<template>
  
 <router-view></router-view>
  
</template>
<script>

import { mapActions } from "vuex";


export default {
  name: 'app',
  components: {
  },
  currentUser: "", 
  created() {
    this.currentUser = this.$store.getters.getCurrentUser;
    if(this.currentUser == null)
    {
      this.$router.push('pages/login');
    }
  },
   methods: {
    ...mapActions(['loggedOut']),
    logOut() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.$router.push('/login');
        this.loggedOut();
    },
    toggleSlim() {
      this.collapsed = !this.collapsed;
    }
  },
  watch: {
      $route(to, from) {
      //You can get warning (error: 'from' is defined but never used), if you don't use parameters; 
    //  console.log(to + " -> " + from);
    }
  } 
}
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';

  @import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
  @import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";
  @import "../node_modules/ag-grid-community/dist/styles/ag-theme-material.css";
  @import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";

</style>
