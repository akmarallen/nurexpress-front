<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img src="/img/useravatar.png" class="img-avatar" /> </template
    >\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"
        ><strong>Account</strong></b-dropdown-header
      >
      <b-dropdown-item
        ><i class="fa fa-bell-o" /> Updates
        <b-badge variant="info">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item
        ><i class="fa fa-envelope-o" /> Messages
        <b-badge variant="success">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-header tag="div" class="text-center">
        <strong>Книги</strong>
      </b-dropdown-header>
      <b-dropdown-item v-on:click="BuyBook"
        ><i class="fa fa-usd" /> Покупка
      </b-dropdown-item>
      <b-dropdown-item v-on:click="Logout"
        ><i class="fa fa-lock" /> Выход</b-dropdown-item
      >
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import { mapActions } from "vuex";

export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return {
      itemsCount: 42
    };
  },
  methods: {
    ...mapActions(["loggedOut"]),
    Logout() {
      localStorage.removeItem("currentUser");
      this.loggedOut();
      this.$router.push("../pages/Login");
    },
    Charts() {
      this.$router.push("../Charts");
    },
    Payment() {
      this.$router.push("../payment/payment-list");
    },
    Incassa() {
      this.$router.push("../payment/incassa");
    },
    BuyBook() {
      this.$router.push("../goods/goods-buy");
    },
    SellBook() {
      this.$router.push("../goods/goods-sell");
    },
    Transactions() {
      this.$router.push("../payment/payment-list");
    }
  }
};
</script>
