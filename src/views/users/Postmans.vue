<template>
    <div>
      <div >
              <div class="form-group">
                    <span class="input-group-prepend">
                     <span class="input-group-text">
                          <i class="fa fa-plane"></i>
                      </span>
                      <select v-model="postmanCity" class="custom-select" @change="getPostmans()">
                          <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                      </select>
                  </span>
              </div>
            
      </div>
        
      <div>
          <ag-grid-vue style="width: 100%; height: 288px;"
                      class="ag-theme-balham"                  
                      :columnDefs="fields"
                      rowSelection="single"
                      @grid-ready="onGridReady"
                      :pagination="true"
                      :paginationPageSize="20"
                      :rowData="postmans"
                      @selection-changed="onSelectionChanged">
          </ag-grid-vue>
            <br>
      </div>
      
       <span class="input-group-prepend">
            <select v-model="sector" class="custom-select" >
                  <option v-for="item in sectors" v-bind:key=item.sectorId> {{ item.sector}}</option>
            </select>
            <button class="btn btn-primary" style="float: right;" v-on:click="attachSector()">Курьерди участокко кош!</button>
        </span>
      <br>
      <br>
  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import cities from '../Cities';
import UserService from '../../services/userservice';
import HelperService from '../../services/helperservice';
import columnDefs from './PostmanFields';
import {AgGridVue} from "ag-grid-vue";


export default {
  name: 'expenses',
  data: () => {
    return {
      postmanCity:'',
      cityList: cities,
      postmans: [],
      fields: columnDefs,
      gridApi: null,
      columnApi: null,
      sectors:[],
      sector: '',
      seclectedUser: ''
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
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  },
  created()
  {
  },
  methods: {
     getSectors(city)
        {
            HelperService.listSectors(this.$store.getters.getCurrentUser, city).then((response)=>{
                this.sectors = response;
            });
        },
     onSelectionChanged() {
      var selectedRows = this.gridApi.getSelectedRows();
      this.seclectedUser = selectedRows[0];
      this.getSectors(selectedRows[0].city);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },
    getPostmans()
    {
         UserService.getPostmans(this.$store.getters.getCurrentUser, this.postmanCity).then((response)=>{
            this.postmans = response;
         });
    },
    attachSector()
    {
         UserService.attachSector(this.$store.getters.getCurrentUser, this.seclectedUser.userId, this.sector).then((response)=>{
            this.getPostmans();
            this.sector = '';
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
