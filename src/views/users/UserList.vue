<template>
  <div class="row">
      <b-col cols="12" xl="12">
        <transition name="slide">
          <b-card>
            <div slot="header">Tests</div>
              <table class="table table-striped table-hover">
                <tbody>
                      <!-- define your own table row -->
                  <tr>
                    <th>Но</th>
                    <th>Аты</th>
                    <th>Баасы</th>
                    <th>Убак</th>
                    <th>Суроо</th>
                    <th>Попыт</th>
                    <th>Тил</th>
                    <th>Публ</th>
                    <th>Акысыз?</th>
                    <th colspan="2">Actions</th>
                  </tr>
                  <tr v-for="item in items" :key=item.mainTestId>
                    <td>{{item.testOrder}}</td>
                    <td>{{item.testName}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.duration}}</td>
                    <td>{{item.questions}}</td>
                    <td>{{item.testCode}}</td>
                    <td>{{item.lang}}</td>
                    <td><b-form-checkbox  v-model="item.published" :disabled="true"></b-form-checkbox></td>
                    <td><b-form-checkbox  v-model="item.publicStatus" :disabled="true"></b-form-checkbox></td>                                    
                    <td>
                      <b-button  size="sm" variant="warning" v-on:click="updateTest(item)"><i class="fa fa-edit"></i> Оңдо</b-button>
                    </td>
                    <td>
                      <b-button  size="sm" variant="html5" v-on:click="addQuestion(item)"><i class="fa fa-question-circle-o"></i> Question</b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
          </b-card>
        </transition>
      </b-col>
    </div>
</template>

<script>
import { mapActions } from "vuex";


export default {
  name: 'test-list',
  data: () => {
    return {
      items: [],
    }
  },
  computed: {
  },
  created()
  {
    this.getTests();
  },
  methods: {
    ...mapActions(['setUpdatedTest']),       
    getTests()
    {
         TestService.listTests(this.$store.getters.getCurrentUser).then((response)=>{
            this.items = response;
         });
         
    },
    updateTest(item) 
    {
        this.setUpdatedTest(item);
        this.$router.push("/tests/test-operation")
    },
    addQuestion(item)
    {
        this.setUpdatedTest(item);
        this.$router.push("/tests/test-question")
    },    
  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
