<template>
    <div>
      <div >
        <form @submit.prevent="getExpenses">
              <div class="form-group">
                    <span class="input-group-prepend">
                     <span class="input-group-text">
                          <i class="fa fa-plane"></i>
                      </span>
                      <select v-model="expenseCity" class="custom-select">
                          <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
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

              <button class="btn btn-primary" style="float: left;" >Каражаттар</button>

              <button class="btn btn-warning" style="float: right;" v-on:click="newExpense()" >Жаңы киргиз</button>
                  <b-modal size="lg" v-model="expenseScreenShow">
                      <div class="jumbotron">
                                    <form @submit.prevent="handleExpense">
                                      <ValidationObserver v-slot="{ valid }">
                                          <ValidationProvider name="Город" rules="required" v-slot="{ errors }">
                                              <div class="form-group">
                                                <span class="input-group">
                                                  <span class="input-group-text">
                                                    <i class="fa fa-stop"></i>
                                                </span>
                                                  <select v-model="expense.expenseCity" class="custom-select">
                                                      <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                                                  </select>
                                                </span>
                                                <div><p>{{ errors[0] }}</p></div>
                                              </div>
                                          </ValidationProvider>
                                         
                                          <ValidationProvider name="Сумма к оплате" rules="required" v-slot="{ errors }">
                                              <div class="form-group">
                                                  <span class="input-group">
                                                    <span class="input-group-text">
                                                    <i class="fa fa-money"></i>
                                                    </span>
                                                  <input type="number" v-model="expense.expenseAmount"  id="expenseAmount" class="form-control"/>
                                                  </span>
                                                  <div><p>{{ errors[0] }}</p></div>
                                              </div>
                                          </ValidationProvider>
                                          <ValidationProvider name="Примечание" rules="required" v-slot="{ errors }">
                                              <div class="form-group">
                                                  <span class="input-group">
                                                    <span class="input-group-text">
                                                    <i class="fa fa-file-text"></i>
                                                    </span>
                                                  <input type="text" v-model="expense.expenseExplanation"  id="expenseExplanation" class="form-control" />
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
                                                  <datepicker v-model="expense.expenseDate"  id ="expenseDate" :format="customFormatter"></datepicker>
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
        <br>
        <br>
          <ag-grid-vue style="width: 100%; height: 300px;"
                      class="ag-theme-balham"                  
                      :columnDefs="fields"
                      rowSelection="single"
                      @grid-ready="onGridReady"
                      :rowData="items">
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
import cities from '../Cities';
import HelperService from '../../services/helperservice';
import ExpenseModel from '../../models/expense';
import columnDefs from './ExpenseFields';
import {AgGridVue} from "ag-grid-vue";


export default {
  name: 'expenses',
  data: () => {
    return {
      totalExpense:'',
      expenseScreenShow:false,
      expenseCity:'',
      collectionDate1:'',
      collectionDate2:'',
      cityList: cities,
      items: [],
      postmans: [],
      fields: columnDefs,
      gridApi: null,
      columnApi: null,
      expense:new ExpenseModel(),
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
  },
  methods: {
    
    handleExpense() {
         HelperService.saveExpense(this.$store.getters.getCurrentUser, this.expense).then((response)=>{
            this.expenseScreenShow = !this.expenseScreenShow;
            this.getExpenses();
         });
    },
     newExpense() {
        this.expenseScreenShow = !this.expenseScreenShow;
    },
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    },
    getExpenses()
    {
        var date1=moment(this.collectionDate1).format('YYYY-MM-DD');
        var date2=moment(this.collectionDate2).format('YYYY-MM-DD');
         HelperService.listExpenses(this.$store.getters.getCurrentUser, this.expenseCity, date1, date2).then((response)=>{
            this.items = response;
            this.calculateTotal(this.items);
         });
        
    },
    customFormatter(date) {
          return moment(date).format('YYYY-MM-DD');
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
