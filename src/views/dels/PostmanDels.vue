<template>
    <div>
      
      <div>
        <form @submit.prevent="getDeliveries">
              <div class="form-group">
                    <span class="input-group-prepend">
                      <span class="input-group-text">
                          <i class="fa fa-bug"></i>
                      </span>                     
                       <select v-model="filter.senderCity" class="custom-select" @change="onChangeCity()"> 
                          <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                      </select>
                      <span class="input-group-text">
                          <i class="fa fa-user-circle"></i>
                      </span>
                      <select v-model="filter.acceptedPerson" class="custom-select">
                        <option v-for="postman in postmans" v-bind:key=postman.Id> {{ postman.email }}</option>
                      </select>
                      <button class="btn btn-primary" style="float: right;" >Сформировать список</button>
                  </span>
              </div>
              <div class="form-group">
                    <span class="input-group">
                        <span class="input-group-text">
                            <i class="fa fa-list"></i>
                        </span>
                        <datepicker v-model="filter.entryDateBegin" name="collectionDate" :format="customFormatter" ></datepicker>
                    </span>
              </div>
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
            
         
      </div>

      <div class="row">
      <b-col cols="4" xl="4">
          <b-card v-for="item in items" :key=item.deliveryId>
              <table class="table">
                  <tr>
                    <td>
                      <barcode v-model="item.id"></barcode>
                    </td>
                    <td>
                     <b> От Куда:</b> {{item.senderCity}}<br>{{item.senderPhone}}<br><br>
                     <b> Куда:</b>  {{item.receiverCity}}<br>{{item.receiverPhone}}<br><br>
                      
                     <b> Оплата:</b>  {{item.deliveryCost}} {{getPayment(item.paymentType)}}<br>
                     <b> Выкуп:</b>  {{item.deliveryiCost}} <br>
                    </td>
                  </tr>
              </table>
          </b-card>
      </b-col>
    </div>
  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import DeliveryService from '../../services/delservice';
import UserService from '../../services/userservice';
import DelFilter from '../../models/delfilter';
import cities from '../Cities';
import columnDefs from './PostmanDelsFields';
import {AgGridVue} from "ag-grid-vue";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';



export default {
  name: 'postman-dels',
  data: () => {
    return {
      cityList: cities,
      items: [],
      postmans: [],
      fields: columnDefs,
      gridApi: null,
      gridOptions: null,
      columnApi: null,
      rowSelection: null,
      modules: [ClientSideRowModelModule],
      rowData: null,
      filter: new DelFilter(),
      city: '',
      postman: '',
      collectionDate: '',
      json_fields: 
        {
          'Номер': 'id',
          'Статус': 'status',
          'Изм.': 'updatedUser',
          'Дата' : 'entryDateText',
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
          'Оплата': 'deliveryCost',
          'Оплатил': 'paidAmount',
          'Тип оплаты': 'paymentType',
          'Оплата выкупа': 'buyType',
          'Сумма выкупа': 'deliveryiCost',
          'Примечание': 'deliveryExplanation',
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
  },
  methods: {
    getPayment(pay)
    {
      if(pay =='RC')
      {
        return "Получатель (Н)"
      }
      else if(pay =='SC')
      {
        return "Отправитель (Н)"
      }
      else if(pay =='RB')
      {
        return "Получатель (Б)"
      }
      else if(pay =='SB')
      {
        return "Отправитель (Б)"
      }
    },
    
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
      this.updatedItem = selectedRows[0];
    },
    onBtnExport() {
      var params = this.getParams();
      this.gridApi.exportDataAsCsv(params);
    },
     onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    },
    getDeliveries()
    {
        this.filter.entryDateBegin = moment(String(this.filter.entryDateBegin)).format('YYYY-MM-DD');
        this.filter.entryDateEnd = moment(String(this.filter.entryDateBegin)).format('YYYY-MM-DD');
         DeliveryService.listDeliveries(this.$store.getters.getCurrentUser, this.filter, false).then((response)=>{
            this.items = response;
            this.$router.push({ name: 'PostmanPrint', params: { items: this.items }})

         });
    },
    onChangeCity()
    {
        this.listPostmans();
    },
    listPostmans()
    {
         UserService.listCityPostmans(this.$store.getters.getCurrentUser, this.filter.senderCity).then((response)=>{
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
