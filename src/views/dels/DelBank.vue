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
                        <i class="fa fa-phone"></i>
                      </span>
                      <input type="tel" v-model="filter.phone"  id="phone" name="phone" class="form-control"/>
                  </span>
              </div>
              <div class="form-group">
                   <span class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-building"></i>
                      </span>
                      <input type="tel" v-model="filter.companyOrName"  id="companyOrName" name="companyOrName" class="form-control"/>
                    </span>
              </div>
              <div class="form-group">
                    
                  <span class="input-group ml-0">
                    <span class="input-group-text">
                        <i class="fa fa-calendar"></i>
                      </span>
                      <datepicker v-model="filter.entryDateBegin" name="beginDate" :format="customFormatter"></datepicker>
                      &nbsp;&nbsp;-&nbsp;&nbsp;
                      <datepicker v-model="filter.entryDateEnd" name="beginDate" :format="customFormatter"></datepicker>
           
                </span>
                <br>

           <!--     <button class="btn btn-warning btn-sm" style="float: right;" v-if="userIsAdmin" v-on:click="paySelectedRows()">Тандалгандарды төлө</button>&nbsp;-->
                <button class="btn btn-primary btn-sm" >Сформировать список</button>&nbsp;
                <button class="btn btn-secondary btn-sm" v-on:click="clearFilter()" style="float: right">Очистить фильтр</button>&nbsp;
              </div>
             
            
            </ValidationObserver>
          </form>
        </div>

          
      <div>
 
          <ag-grid-vue style="width: 100%; height: 300px;"
                      class="ag-theme-balham"                  
                      id="AnaTablo"
                      :columnDefs="fields"
                      rowSelection='multiple'
                      :gridOptions="gridOptions"
                      :modules="modules"
                      @grid-ready="onGridReady"
                      :pagination="true"
                      :paginationPageSize="20"
                      :rowData="items">
          </ag-grid-vue>
         
<input type="tel" v-model="totalAmount"  id="companyOrName" name="companyOrName" class="form-control" readOnly="true"/> 
        <download-excel
                  class   = "btn btn-primary btn-sm mr-2"
                  style="float: right"
                  :data   = "items"
                  :fields = "json_fields"
                  worksheet = "My Worksheet"
                  name    = "Долги.xls">
                  Экспортировать в Excel
                </download-excel>
      </div>

      
  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import DeliveryService from '../../services/delservice';
import DelFilter from '../../models/delfilter';
import cities from '../Cities';
import columnDefs from './FieldsBank';
import {AgGridVue} from "ag-grid-vue";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';



export default {
  name: 'del-bank',
  data: () => {
    return {
      updateModelScreen: false,
      corporateCompanySearch: false,
      filter: new DelFilter(),
      cityList: cities,
      items: [],
      customers: [],
      updatedItem: '',
      postmans: [],
      fields: columnDefs,
      gridApi: null,
      gridOptions: null,
      columnApi: null,
      rowSelection: null,
      modules: [ClientSideRowModelModule],
      rowData: null,
      userIsAdmin: false,
      totalAmount:0,
      json_fields: 
        {
          'Статус': 'status',
          'Дата' : 'entryDateText',
          'Оплата': 'deliveryCost',
          'Тип оплаты': 'paymentType',
          'От куда': 'senderCity',
          'Тел. Отпр.': 'senderPhone',
          'Отправитель': 'senderName',
          'Фирма Отпр.': 'senderCompany',
          'Адрес Отпр.': 'senderAddress',
          'Куда': 'receiverCity',
          'Тел. Пол.': 'receiverPhone',
          'Получатель': 'receiverName',
          'Фирма Пол.': 'receiverCompany',
          'Адрес Пол.': 'receiverAddress',
          'Тип Отпр.': 'deliveryType',
          'Кол.': 'deliveryCount',
          'Сумма выкупа': 'deliveryiCost',
          'Примечание': 'deliveryExplanation',
          'Курьер получ.': 'acceptedPerson',
      },
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
  },
  created()
  {
    if(this.$store.getters.getCurrentUser.role=='ADMIN')
      this.userIsAdmin = true;
    else
      this.userIsAdmin = false;

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
    paySelectedRows() {
          var selectedNodes = this.gridApi.getSelectedNodes();
          if(selectedNodes != null)
          {
            var selectedData = selectedNodes.map( node => node.data );
            var selectedDataStringPresentation = selectedData.map( node => node.deliveryId).join(',');
            DeliveryService.payeDebted(this.$store.getters.getCurrentUser, selectedDataStringPresentation).then((response)=>{
                 this.getDeliveries();
            });
          }
    },
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    },
    getDeliveries()
    {
      var i= 0 ;
      this.totalAmount = 0;
        this.filter.entryDateBegin = moment(String(this.filter.entryDateBegin)).format('YYYY-MM-DD');
        this.filter.entryDateEnd = moment(String(this.filter.entryDateEnd)).format('YYYY-MM-DD');
         DeliveryService.listBankDeliveries(this.$store.getters.getCurrentUser, this.filter).then((response)=>{
            this.items = response;
            for(i=0; i<this.items.length; i++)
            {
              this.totalAmount += this.items[i].deliveryiCost;
            }
         });

         
    },
    
    clearFilter() {
        this.filter.companyOrName ='';
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
