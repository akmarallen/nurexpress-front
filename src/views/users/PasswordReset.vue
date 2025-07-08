<template>
  <div class="animated fadeIn">

      <div class="row" >
        <div class="card text-center col-sm-12 col-md-6 col-lg-6">
          <br>
            <b-row >
            <b-col>
              <b-card>
                <div slot="header">
                  <strong>Reset Password</strong> 
                </div>

                <b-form>

                    <b-form-group label="Phone number" label-for="basicName" :label-cols="3" >
                      <b-form-input id="basicName" type="text" v-model="phoneNo"></b-form-input>
                    </b-form-group>

                    <div slot="footer" style="text-align: right">
                      <b-button  size="md" variant="css3" v-on:click="getUser()"><i class="fa fa-phone"></i> GET USER</b-button>&nbsp;&nbsp;
                    </div>

                </b-form>
              </b-card>
              
            </b-col>
          </b-row>
        </div>
      </div>

    <div class="row">
        <div class="card text-center col-sm-12 col-md-6 col-lg-6">
          <div class="card-header">
            <h4>{{user.nameSurname}}</h4>
          </div>
          <div class="card-body">
            <!--<div style="text-align: left" v-html="item.courseDesc"> </div>-->
            <h5>{{user.phone}}</h5>
            <h5>{{user.province}}</h5>
            <h5>{{user.region}}</h5>
            <h5>{{user.email}}</h5>
            
            <br>
          <button class="btn btn-warning" v-on:click="resetPassword()">
                <i class="fa fa-list-alt"></i>
                Password Reset</button>
            <br>
          </div>
        
          <div class="card-footer">
           {{newPassword.password}}<br>
          </div>
        </div>
      </div><!--/.row-->
  </div>
</template>

<script>
import UserService from '../../services/userservice';

export default {
    name: 'password-reset',
    components: {
    },
    data () {
        return {  
           phoneNo: '',
           user: '',
           newPassword: '',
        }
    },
    created(){
        
    },
  
    methods: { 
        
        getUser()
        {
            this.newPassword = '';
            UserService.getUser(this.$store.getters.getCurrentUser, this.phoneNo).then((response)=>{
                this.user = response;
            });
            
        },
        resetPassword()
        {
            UserService.resetPassword(this.$store.getters.getCurrentUser, this.user).then((response)=>{
                this.newPassword = response;
              }).catch(error=>{
                console.log(error);
              });
        },
       
    }
};


</script>

<style scoped>

.jumbotron{
   margin-top: 20px;
}

p {
    color: brown;
}

@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';

</style>
