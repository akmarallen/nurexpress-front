<template>
    <div>
      <div >
        <form @submit.prevent="getCollections">
              <div class="form-group">
                    <span class="input-group-prepend">
                      <span class="input-group-text">
                          <i class="fa fa-bug"></i>
                      </span>                     
                       <select v-model="city" class="custom-select" @change="onChangeCity()"> 
                          <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                      </select>
                      <span class="input-group-text">
                          <i class="fa fa-user-circle"></i>
                      </span>
                      <select v-model="postman" class="custom-select">
                        <option v-for="postman in postmans" v-bind:key=postman.Id> {{ postman.email }}</option>
                      </select>
                      <button class="btn btn-primary" style="float: right;" >Сформировать список</button>
                  </span>
              </div>
              <div class="form-group col-4">
                    <span class="input-group">
                        <span class="input-group-text">
                            <i class="fa fa-list"></i>
                        </span>
                        <datepicker v-model="collectionDate" name="collectionDate" :format="customFormatter" ></datepicker>
                    </span>
              </div>
        </form>
      </div>
      <div>
          <ag-grid-vue style="width: 100%; height: 250px;"
                      class="ag-theme-balham"                  
                      :columnDefs="fields"
                      rowSelection="single"
                      @grid-ready="onGridReady"
                      :pagination="true"
                      :paginationPageSize="20"
                      :rowData="items">
          </ag-grid-vue>
          <br>
           <span class="input-group">
              <span class="input-group-text">
                    <i class="fa fa-bitcoin"></i>
                </span>
              <input type="tel" v-model="totalTransaction"  id="totalTransaction" class="form-control"/>
        
              <span class="input-group-text">
                    <i class="fa fa-bitcoin"></i>
                </span>
              <input type="tel" v-model="totalCollection"  id="totalColelction" class="form-control"/>
        
              <span class="input-group-text">
                    <i class="fa fa-rub"></i>
                </span>
              <input type="tel" v-model="difference"  id="difference" class="form-control"/>
          </span>
      </div>

  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import cities from '../Cities';
import UserService from '../../services/userservice';
import columnDefs from './CollectionFields';
import {AgGridVue} from "ag-grid-vue";



export default {
  name: 'postman-collection',
  data: () => {
    return {
         cityList: cities,
      collectionDate:'',
      postman:'',
      city:'',
      items: [],
      transactions: [],
      postmans: [],
      fields: columnDefs,
      gridApi: null,
      columnApi: null,
      totalTransaction:'',
      totalCollection:'',
    }
  },
  components: {
      Datepicker,
      AgGridVue
  },
  computed: {

    difference()
    {
      return this.totalTransaction + this.totalCollection;
    }
    
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
    this.collectionDate = new Date();
  },
  methods: {
    
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    },
    getCollections()
    {
         UserService.getPostmanCollections(this.$store.getters.getCurrentUser, this.postman, this.collectionDate).then((response)=>{
            this.items = response;
            this.calculateTotalCollection(this.items);
         });

         UserService.getPostmanTransactions(this.$store.getters.getCurrentUser, this.postman, this.collectionDate).then((response)=>{
            this.transactions = response;
            this.calculateTotalTransaction(this.transactions);
         });
    },
    calculateTotalTransaction(transactions) {
        var i;
        this.totalTransaction = 0;
        for (i = 0; i < transactions.length; i++) {
            this.totalTransaction += transactions[i].amount;
        }
    },
    calculateTotalCollection(collections) {
      var i;
      this.totalCollection = 0;
        for (i = 0; i < collections.length; i++) {
            this.totalCollection += collections[i].amount;
        }
    },
    onChangeCity()
    {
        this.listPostmans();
    },
    listPostmans()
    {
        this.postmans = '';
         UserService.getPostmans(this.$store.getters.getCurrentUser, this.city).then((response)=>{
            this.postmans = response;
         });
    },
    customFormatter(date) {
          return moment(date).format('YYYY-MM-DD');
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



</style>
