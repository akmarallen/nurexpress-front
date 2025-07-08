<template>
    <div>
      <div >
        <form @submit.prevent="getCollections">
            
              <div class="form-group">
                    <span class="input-group-prepend">
                      <span class="input-group-text">
                          <i class="fa fa-plane"></i>
                      </span>
                      <select v-model="senderCity" class="custom-select">
                          <option v-for="city in cityList" v-bind:key=city.name> {{ city.name }}</option>
                      </select>
                      <span class="input-group-text">
                        <i class="fa fa-plane"></i>
                      </span>
                      <select v-model="receiverCity" class="custom-select">
                          <option v-for="city in cityList" v-bind:key=city.name> {{ city.name }}</option>
                      </select>
                  </span>
              </div>
              <div class="form-group">
                    <span class="input-group">
                        <span class="input-group-text">
                            <i class="fa fa-list"></i>
                        </span>
                        <datepicker v-model="collectionDate" name="collectionDate" :format="customFormatter" ></datepicker> &nbsp;&nbsp;&nbsp;
                        <button class="btn btn-primary btn-sm ml-10" style="float: right;" >Сформировать список</button>
                    </span>
                    
              </div>
        </form>
      </div>
      <div>
          <ag-grid-vue style="width: 100%; height: 380px;"
                      class="ag-theme-balham"  
                      :columnDefs="fields"
                      rowSelection="single"
                      @grid-ready="onGridReady"
                      :pagination="true"
                      :paginationPageSize="100"
                      :rowData="items">
          </ag-grid-vue>

          <ag-grid-vue style="width: 100%; height: 65px;"
                      class="ag-theme-balham"  
                      :columnDefs="fieldsT"
                      rowSelection="single"
                      @grid-ready="onGridReady2"
                      :rowData="items2">
          </ag-grid-vue>
                      
          <br>
          <download-excel
                  class   = "btn btn-primary btn-sm mr-2"
                  style="float: right"
                  :data   = "items"
                  :fields = "json_fields"
                  worksheet = "My Worksheet"
                  name    = "Отчет.xls">
                  Экспортировать в Excel
                </download-excel>
      </div>

  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import HelperService from '../../services/helperservice';
import columnDefs from './DailyReportFields';
import columnDefsT from './DailyReportFieldsT';
import {AgGridVue} from "ag-grid-vue";
import cities from '../Cities';


export default {
  name: 'daily-report',
  data: () => {
    return {
      collectionDate:'',
      senderCity:'',
      receiverCity:'',
      cityList: cities,
      items: [],
      items2: [],
      fields: columnDefs,
      fieldsT: columnDefsT,
      gridApi: null,
      columnApi: null,
      json_fields: 
        {
          'От куда': 'senderCity',
          'Куда': 'receiverCity',
          'Выкуп': 'amount1',
          'Доставка+': 'amount2',
          'Доставка-': 'amount3',
          'Дос. Банк': 'amount4',
          'Количество': 'amount5',
         
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
    this.defaultColDef = {
      editable: true,
      resizable: true,
      minWidth: 120,
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
    onGridReady2(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    },
    getCollections()
    {
      this.items2 = [];
      HelperService.getDailyReport(this.$store.getters.getCurrentUser, this.collectionDate, this.senderCity, this.receiverCity).then((response)=>{
            this.items = response;
            var item = this.items[this.items.length-1];
            this.items2.push(item); 
            this.items.splice(-1, 1);
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
