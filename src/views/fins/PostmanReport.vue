<template>
    <div>
      <div >
        <form @submit.prevent="getReport">
              <div class="form-group">
                    <span class="input-group-prepend">
                      <span class="input-group-text">
                          <i class="fa fa-plane"></i>
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
              <button class="btn btn-warning" style="float: right;">Отчёт чыгар</button>
            </form>
        </div>
      <div>
        <br><br>
          <ag-grid-vue style="width: 100%; height: 350px;"
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
      </div>
  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import HelperService from '../../services/helperservice';
import UserService from '../../services/userservice';
import columnDefs from './PostmanReportFields';
import cities from '../Cities';
import {AgGridVue} from "ag-grid-vue";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';


export default {
  name: 'postmanreport',
  data: () => {
    return {
      cityList: cities,
      city: '',
      postman:'',
      collectionDate1:'',
      collectionDate2:'',
      postmans: [],
      items: [],
      fields: columnDefs,
      gridOptions: null,
      modules: [ClientSideRowModelModule],
      gridApi: null,
      columnApi: null,
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
    onSelectionChanged() {
      var selectedRows = this.gridApi.getSelectedRows();
      this.updatedItem = selectedRows[0];
    },
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    },
    getReport()
    {
        var date1 = moment(this.collectionDate1).format('YYYY-MM-DD');
        var date2 = moment(this.collectionDate2).format('YYYY-MM-DD');
         HelperService.getPostmanReport(this.$store.getters.getCurrentUser, this.postman, date1, date2).then((response)=>{
            this.items = response;
         });
    },
   
    customFormatter(date) {
          return moment(date).format('YYYY-MM-DD');
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
