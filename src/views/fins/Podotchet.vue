<template>
    <div>
      <div >
        <form @submit.prevent="getExpenses">
              <div class="form-group">
                    <span class="input-group-prepend">
                     <span class="input-group-text">
                          <i class="fa fa-plane"></i>
                      </span>
                      <select v-model="transpostman" class="custom-select">
                        <option v-for="postman in postmans" v-bind:key=postman.Id> {{ postman.email }}</option>
                      </select>
                  </span>
              </div>
              <div class="form-group">
                    <span class="input-group">
                        <span class="input-group-text">
                            <i class="fa fa-list"></i>
                        </span>
                        <datepicker v-model="collectionDate1" name="collectionDate1" :format="customFormatter" ></datepicker>
                        <span class="input-group-text">
                            <i class="fa fa-list"></i>
                        </span>
                        <datepicker v-model="collectionDate2" name="collectionDate2" :format="customFormatter" ></datepicker>
                  </span>
              </div>
            <br>
              <button class="btn btn-primary" >Подотчёт тизмеси</button>
              &nbsp;<button class="btn btn-secondary" v-if="userIsAdmin" v-on:click="updateExpense()">Изменить</button>
              <b-modal size="lg" v-model="expenseUpdateShow">
                      <div class="jumbotron">
                                    <form @submit.prevent="handleUpdate">
                                      <ValidationObserver v-slot="{ valid }">
                                         
                                          <ValidationProvider name="Сумма" rules="required" v-slot="{ errors }">
                                              <div class="form-group">
                                                  <span class="input-group">
                                                    <span class="input-group-text">
                                                    <i class="fa fa-money"></i>
                                                    </span>
                                                  <input type="number" v-model="updatedItem.amount"  id="amount" class="form-control"/>
                                                  </span>
                                                  <div><p>{{ errors[0] }}</p></div>
                                              </div>
                                          </ValidationProvider>
                                         
                                          <div class="form-group">
                                            <p>Чтобы сохранить данные изпользуйте кнопку "Сохранить". Башка кнопкалар жөн эле жаап коёт.</p>
                                            <button class="btn btn-primary" :disabled="!valid">Сохранить</button>
                                          </div>
                                        </ValidationObserver>
                                    </form>
                          </div>
                    </b-modal>
              
              <button class="btn btn-warning" style="float: right;" v-on:click="newExpense()" >Жаңы киргиз</button>
                  <b-modal size="lg" v-model="expenseScreenShow">
                      <div class="jumbotron">
                                    <form @submit.prevent="handleTransaction">
                                      <ValidationObserver v-slot="{ valid }">
                                          <ValidationProvider name="Курьер" rules="required" v-slot="{ errors }">
                                              <div class="form-group">
                                                <span class="input-group">
                                                  <span class="input-group-text">
                                                    <i class="fa fa-stop"></i>
                                                </span>
                                                  <select v-model="trasnactionPostman" class="custom-select">
                                                    <option v-for="postman in postmans" v-bind:key=postman.Id> {{ postman.email }}</option>
                                                  </select>
                                                </span>
                                                <div><p>{{ errors[0] }}</p></div>
                                              </div>
                                          </ValidationProvider>
                                         
                                          <ValidationProvider name="Сумма" rules="required" v-slot="{ errors }">
                                              <div class="form-group">
                                                  <span class="input-group">
                                                    <span class="input-group-text">
                                                    <i class="fa fa-money"></i>
                                                    </span>
                                                  <input type="number" v-model="trasnactionAmount"  id="trasnactionAmount" class="form-control"/>
                                                  </span>
                                                  <div><p>{{ errors[0] }}</p></div>
                                              </div>
                                          </ValidationProvider>

                                          <div class="form-group ">
                                            <ValidationProvider name="Дата" rules="required" v-slot="{ errors }">
                                                <span class="input-group">
                                                    <span class="input-group-text">
                                                      <i class="fa fa-calendar"></i>
                                                  </span>
                                                  <datepicker v-model="trasnactionDate"  id ="trasnactionDate" :format="customFormatter"></datepicker>
                                                </span>
                                                <div><p>{{ errors[0] }}</p></div>
                                            </ValidationProvider>
                                          </div>
                                          
                                          <div class="form-group">
                                            <p>Чтобы сохранить данные изпользуйте кнопку "Сохранить". Башка кнопкалар жөн эле жаап коёт.</p>
                                            <button class="btn btn-primary" :disabled="!valid">Сохранить</button>
                                          </div>
                                        </ValidationObserver>
                                    </form>
                          </div>
                    </b-modal>
            </form>
        </div>
      <div>

        <p>Өчүр деген сумманы 0 кылып өзгөртүп коёт. Толук өчүрүп таштабайт.</p>
      
          <ag-grid-vue style="width: 100%; height: 200px;"
                      class="ag-theme-balham"                  
                      :columnDefs="fields"
                      rowSelection="single"
                      :gridOptions="gridOptions"
                      :modules="modules"
                      @grid-ready="onGridReady"
                      :rowData="items"
                       @selection-changed="onSelectionChanged">
          </ag-grid-vue>
            <br>
           <span class="input-group">
              <span class="input-group-text">
                    <i class="fa fa-money"></i>
                </span>
              <input type="tel" v-model="totalExpense"  id="totalExpense" class="form-control"/>
          </span>
           <br>
      </div>
  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import HelperService from '../../services/helperservice';
import UserService from '../../services/userservice';
import columnDefs from './PodotchetFields';
import {AgGridVue} from "ag-grid-vue";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';


export default {
  name: 'podotchet',
  data: () => {
    return {
      totalExpense:'',
      expenseUpdateShow:false,
      expenseScreenShow:false,
      transpostman:'',
      trasnactionPostman:'',
      trasnactionAmount:'',
      trasnactionDate:'',
      collectionDate1:'',
      collectionDate2:'',
      items: [],
      postmans: [],
      fields: columnDefs,
       gridOptions: null,
       modules: [ClientSideRowModelModule],
      gridApi: null,
      columnApi: null,
      updatedItem:'',
      userIsAdmin: false,
    }
  },
  components: {
      Datepicker,
      AgGridVue
  },
  computed: {

  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  beforeMount() {
    this.gridOptions = {};
    this.defaultColDef = {
      editable: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  },
  created()
  {
    if(this.$store.getters.getCurrentUser.role=='ADMIN')
      this.userIsAdmin = true;
    else
      this.userIsAdmin = false; 
    this.listPostmans();
  },
  methods: {
    onSelectionChanged() {
      var selectedRows = this.gridApi.getSelectedRows();
      this.updatedItem = selectedRows[0];
    },
    newExpense() {
        this.expenseScreenShow = !this.expenseScreenShow;
    },
     updateExpense() {
        this.expenseUpdateShow = !this.expenseUpdateShow;    
    },
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    },
    getExpenses()
    {
        if(this.collectionDate1!=null &&this.collectionDate2!=null)
        {
          var date1 = moment(this.collectionDate1).format('YYYY-MM-DD');
          var date2 = moment(this.collectionDate2).format('YYYY-MM-DD');
          HelperService.listTransactions(this.$store.getters.getCurrentUser, this.transpostman, date1, date2).then((response)=>{
              this.items = response;
              this.calculateTotal(this.items);
          });
        }
    },
    handleTransaction()
    {
         HelperService.saveTransaction(this.$store.getters.getCurrentUser, this.trasnactionPostman, this.trasnactionAmount, this.trasnactionDate).then((response)=>{
            this.getExpenses();
            this.expenseScreenShow = !this.expenseScreenShow;
         });
    },
    handleUpdate()
    {
         HelperService.updateTransaction(this.$store.getters.getCurrentUser, this.updatedItem).then((response)=>{
            this.expenseUpdateShow = !this.expenseUpdateShow;
            this.getExpenses();
         });
    },
    customFormatter(date) {
          return moment(date).format('YYYY-MM-DD');
    },
    listPostmans()
    {
         UserService.listPostmans(this.$store.getters.getCurrentUser).then((response)=>{
            this.postmans = response;
         });
    },
    calculateTotal(transactions) {
        var i;
        this.totalExpense = 0;
        for (i = 0; i < transactions.length; i++) {
            this.totalExpense += transactions[i].amount;
        }
    },
    
  }
}
</script>

<style scoped lang="scss">

.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}

.fa-circle {
  color: salmon;
}

.fa-check-square {
  color: green;
}

p {
    color: brown;
}

</style>
