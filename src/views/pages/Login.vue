<template>
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-3">
              <b-card-body>
                <b-form name="form" @submit.prevent="handleLogin">
                  <h1>Логин</h1>
                  <p class="text-muted">Логин паролуңузду жазып системага кириңиз</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Логин" autocomplete="phone" v-model="user.username"/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Пароль" autocomplete="current-password" v-model="user.password"/>
                  </b-input-group>
                  <b-row>
                    <b-col>
                      <b-button variant="primary" class="px-4"  v-on:click="handleLogin">Кирүү</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
</template>

<script>
import UserService from '../../services/userservice';
import User from '../../models/user';
import {mapActions} from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            user: new User('','','','','',''),
        };
    },
    mounted() {
      
    },
    methods: {
        ...mapActions(['loggedIn']),
        handleLogin() {
              this.loading = true;
              UserService.login(this.user).then(
                data => {
                  this.user = JSON.parse(localStorage.getItem('currentUser'));
                    
                  if(this.user.role=='ADMIN' || this.user.role=='OPERATOR')
                  {
                      this.loggedIn(this.user)
                      this.$router.push('/');
                  }
                  else
                    alert("Бул жерге кирүү үчүн администратор болушуңуз керек!");
                },
                error => {
                     alert("Туура эмес кирдиңиз, же вообще эч нерсе кирбедиңиз!");
                }
            );
        },
       
    },
}


</script>
