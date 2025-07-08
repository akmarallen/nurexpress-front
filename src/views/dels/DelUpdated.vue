<template>
    <div>
      <div>
        <form @submit.prevent="getDeliveries">
          <ValidationObserver v-slot="{ valid }">
              <div class="form-group">
                    <span class="input-group-prepend">
                      <span class="input-group-text">
                          <i class="fa fa-plane"></i>
                      </span>
                      <select v-model="filter.senderCity" class="custom-select">
                          <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                      </select>
                      <span class="input-group-text">
                        <i class="fa fa-plane"></i>
                      </span>
                      <select v-model="filter.receiverCity" class="custom-select">
                          <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                      </select>
<!--
                      <span class="input-group-text">
                          <i class="fa fa-user-circle"></i>
                      </span>
                      <select v-model="filter.acceptedPerson" class="custom-select">
                        <option v-for="postman in postmans" v-bind:key=postman.Id> {{ postman.email }}</option>
                      </select>
-->
                  </span>
              </div>
              <div class="form-group">
                   <span class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-phone"></i>
                      </span>
                      <input type="tel" v-model="filter.phone"  id="phone" name="phone" class="form-control"/>
                      <span class="input-group-text">
                        <i class="fa fa-vcard-o"></i>
                      </span>
                      <input type="tel" v-model="filter.companyOrName"  id="companyOrName" name="companyOrName" class="form-control"/>
                    </span>
              </div>
              <div class="form-group">
                  <span class="input-group ml-5">
                    <ValidationProvider name="Дата 1" rules="required" v-slot="{ errors }">
                      <datepicker v-model="filter.entryDateBegin" name="beginDate" :format="customFormatter"></datepicker>
                      <div><p>{{ errors[0] }}</p></div>
                    </ValidationProvider>
                      &nbsp;&nbsp;-&nbsp;&nbsp;
                    <ValidationProvider name="Дата 2" rules="required" v-slot="{ errors }">
                      <datepicker v-model="filter.entryDateEnd" name="beginDate" :format="customFormatter"></datepicker>
                     <div><p>{{ errors[0] }}</p></div>
                    </ValidationProvider>
                </span>

                <button class="btn btn-warning btn-sm" style="float: right;" v-on:click="onBtnExport()">Экспорт</button>&nbsp;
                <button class="btn btn-primary btn-sm" :disabled="!valid">Сформировать список</button>&nbsp;
                <button class="btn btn-secondary btn-sm" v-on:click="clearFilter()">Очистить фильтр</button>&nbsp;
              </div>
            
            </ValidationObserver>
          </form>
        </div>
          
      <div>
 
          <ag-grid-vue style="width: 100%; height: 250px;"
                      class="ag-theme-balham"                  
                      id="AnaTablo"
                      :columnDefs="fields"
                       rowSelection='single'
                      :gridOptions="gridOptions"
                      :modules="modules"
                      @grid-ready="onGridReady"
                      :pagination="true"
                      :paginationPageSize="20"
                      :rowData="items"
                      @selection-changed="onSelectionChanged">
          </ag-grid-vue>

<br>
          <ag-grid-vue style="width: 100%; height: 200px;"
                      class="ag-theme-balham"                  
                      id="CocukTablo"
                      :columnDefs="fields1"
                       rowSelection='single'
                      :gridOptions="gridOptions1"
                      :modules="modules1"
                      @grid-ready="onGridReady1"
                      :pagination="true"
                      :rowData="itemsLog"
                      :paginationPageSize="20"
                      @selection-changed="onSelectionChanged">
          </ag-grid-vue>
         <br>
      </div>
  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import DeliveryService from '../../services/delservice';
import HelperService from '../../services/helperservice';
import UserService from '../../services/userservice';
import DelFilter from '../../models/delfilter';
import cities from '../Cities';
import columnDefs from './FieldsUpdated';
import {AgGridVue} from "ag-grid-vue";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';



export default {
  name: 'del-updated',
  data: () => {
    return {
      updateModelScreen: false,
      corporateCompanySearch: false,
      filter: new DelFilter(),
      cityList: cities,
      items: [],
      customers: [],
      postmans: [],
      fields: columnDefs,
      gridApi: null,
      gridOptions: null,
      columnApi: null,
      rowSelection: null,
      modules: [ClientSideRowModelModule],
      rowData: null,
      searchCity: '',
      searchName: '',
      paymentType: '',
      selectedItem:'',

      itemsLog:[],
      fields1: columnDefs,
      gridApi1: null,
      gridOptions1: null,
      columnApi1: null,
    //  rowSelection: null,
      modules1: [ClientSideRowModelModule],
      rowData1: null,

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
    this.gridApi1 = this.gridOptions1.api;
    this.gridColumnApi1 = this.gridOptions1.columnApi;
  },
  beforeMount() {
    this.gridOptions = {};
      this.gridOptions1 = {};
  },
  created()
  {
    this.listPostmans();
    this.filter.entryDateBegin = new Date();
    this.filter.entryDateEnd = new Date();
  },
  methods: {
    
    getParams() {
      return {
        suppressQuotes: false,
        columnSeparator: ",",
        customHeader: [],
        customFooter: '',
      };
    },
    onSelectionChanged() {
      var selectedRows = this.gridApi.getSelectedRows();
      this.selectedItem = selectedRows;
      this.getLogs();
    },
    onBtnExport() {
      var params = this.getParams();
      this.gridApi.exportDataAsCsv(params);
    },
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    },
    onGridReady1(params) {
        this.gridApi1 = params.api;
        this.columnApi1 = params.columnApi;
    },
    getDeliveries()
    {
        this.filter.entryDateBegin = moment(String(this.filter.entryDateBegin)).format('YYYY-MM-DD');
        this.filter.entryDateEnd = moment(String(this.filter.entryDateEnd)).format('YYYY-MM-DD');
         DeliveryService.listDeliveries(this.$store.getters.getCurrentUser, this.filter, true).then((response)=>{
            this.items = response;
         });
    },
    getLogs()
    {
      DeliveryService.listDeliveryLogs(this.$store.getters.getCurrentUser, this.selectedItem[0].deliveryId).then((response)=>{
            this.itemsLog = response;
         });

      //  let routeData = this.$router.resolve({name: 'DelLogs', params: {deliveryId: this.selectedItem[0].deliveryId}});
      //  window.open(routeData.href, '_blank');
    },
    listPostmans()
    {
         UserService.listPostmans(this.$store.getters.getCurrentUser).then((response)=>{
            this.postmans = response;
         });
    },
    clearFilter() {
        this.filter.acceptedPerson ='';
        this.filter.companyOrName ='';
        this.filter.senderCity ='';
        this.filter.receiverCity ='';
        this.filter.phone ='';
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

.jumbotron {
  padding-top: 20px;
  padding-left: 20px;
}

.form-group {
  margin: 10px;
}

</style>
