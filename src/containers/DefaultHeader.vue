<template>
  <AppHeader fixed>
    <SidebarToggler class="d-lg-none" display="md" mobile />
    <b-link class="navbar-brand" to="#">
      <img
        class="navbar-brand-full"
        src="/img/logo_long.png"
        width="100"
        alt="МЕГА"
      />
    </b-link>
    <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="true" />
    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3"></b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <!--
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
      
        <DefaultHeaderDropdownAccnt/>  -->
    </b-navbar-nav>
  </AppHeader>
</template>
<script>
import { Header as AppHeader, SidebarToggler, AsideToggler } from "@coreui/vue";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";

export default {
  name: "DefaultHeader",
  components: {
    //   AsideToggler,
    AppHeader,
    DefaultHeaderDropdownAccnt,
    SidebarToggler
  }
};
</script>
