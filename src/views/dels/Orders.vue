<template>
    <div>
      <div>
        <form @submit.prevent="getOrders">
          <ValidationObserver v-slot="{ valid }">
              <div class="form-group">
                    <span class="input-group-prepend">
                      <span class="input-group-text">
                          <i class="fa fa-plane"></i>
                      </span>
                      <select v-model="filter.senderCity" class="custom-select" @change="getSectors()">
                          <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                      </select>
                      
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
                       <select v-model="filter.acceptedPerson" class="custom-select" >
                            <option v-for="item in sectors" v-bind:key=item.sectorId> {{ item.sector}}</option>
                      </select>
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

                <button class="btn btn-primary" style="float: right;" :disabled="!valid">Сформировать список</button>&nbsp;
                <button class="btn btn-secondary mr-2" style="float: right;" v-on:click="clearFilter()">Очистить фильтр</button>&nbsp;
                <br><br>
              </div>
            
            </ValidationObserver>
          </form>

               
        </div>
          <b-modal size="lg" v-model="updateModelScreen">
            <div class="jumbotron">
                          <form @submit.prevent="handleUpdate">
                            <ValidationObserver v-slot="{ valid }">
                                    <div class="form-group">
                                      <span class="input-group-text">
                                            Отправитель:
                                          </span>
                                          <ValidationProvider name="От куда" rules="required" v-slot="{ errors }">
                                          <span class="input-group-text">
                                            <span class="input-group-text">
                                              От куда
                                            </span>
                                            <select v-model="updatedItem.senderCity" class="custom-select" @change="getModalSectors()">
                                                <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                                            </select>
                                            <p>{{ errors[0] }}</p>
                                          </span>
                                          </ValidationProvider>
                                          <ValidationProvider name="Тел" rules="required" v-slot="{ errors }">
                                          <span class="input-group-text">
                                            <span class="input-group-text">Телефон</span>
                                            <input type="text" v-model="updatedItem.senderPhone"  id="senderPhone" class="form-control" v-on:change="getSenderCustomer()"/>
                                            <p>{{ errors[0] }}</p>
                                          </span>
                                          </ValidationProvider>
                                          <ValidationProvider name="Имя" rules="required" v-slot="{ errors }">
                                          <span class="input-group-text">
                                            <span class="input-group-text">Имя</span>
                                            <input type="text" v-model="updatedItem.senderName"  id="senderName" class="form-control"/>
                                            <p>{{ errors[0] }}</p>
                                          </span>
                                          </ValidationProvider>
                                          <ValidationProvider name="Фирма" rules="required" v-slot="{ errors }">
                                          <span class="input-group-text">
                                            <span class="input-group-text">Фирма</span>
                                            <input type="text" v-model="updatedItem.senderCompany"  id="senderCompany" class="form-control"/>
                                            <p>{{ errors[0] }}</p>
                                          </span>
                                          </ValidationProvider>
                                          <ValidationProvider name="Адрес" rules="required" v-slot="{ errors }">
                                          <span class="input-group-text">
                                            <span class="input-group-text">Адрес</span>
                                            <input type="text" v-model="updatedItem.senderAddress"  id="senderAddress" class="form-control"/>
                                            <p>{{ errors[0] }}</p>
                                          </span>
                                          </ValidationProvider>
                                    </div>

                                    <div class="form-group">
                                      <span class="input-group-text">
                                          Получатель:
                                        </span>
                                          <span class="input-group-text">
                                            <span class="input-group-text">
                                              От куда
                                            </span>
                                            <select v-model="updatedItem.receiverCity" class="custom-select">
                                                <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                                            </select>
                                          </span>
                                          <span class="input-group-text">
                                            <span class="input-group-text">Телефон</span>
                                            <input type="text" v-model="updatedItem.receiverPhone"  id="receiverPhone" class="form-control" v-on:change="getReceiverCustomer()"/>
                                          </span>
                                          <span class="input-group-text">
                                            <span class="input-group-text">Имя</span>
                                            <input type="text" v-model="updatedItem.receiverName"  id="receiverName" class="form-control"/>
                                          </span>
                                          <span class="input-group-text">
                                            <span class="input-group-text">Фирма</span>
                                            <input type="text" v-model="updatedItem.receiverCompany"  id="receiverCompany" class="form-control"/>
                                          </span>
                                          <span class="input-group-text">
                                            <span class="input-group-text">Адрес</span>
                                            <input type="text" v-model="updatedItem.receiverAddress"  id="receiverAddress" class="form-control"/>
                                          </span>
                                        
                                    </div>
                                    <div class="form-group">
                                        <span class="input-group">
                                           <span class="input-group-text">Примечание</span>
                                        <input type="text" v-model="updatedItem.explanation"  id="expenseExplanation" class="form-control" />
                                        </span>
                                    </div>
                                     <ValidationProvider name="Участок" rules="required" v-slot="{ errors }">
                                          <span class="input-group-text">
                                            <span class="input-group-text">Участок</span>
                                            <select v-model="updatedItem.assignedSector" class="custom-select" >
                                                <option v-for="item in modalsectors" v-bind:key=item.sectorId> {{ item.sector}}</option>
                                            </select>
                                            <p>{{ errors[0] }}</p>
                                          </span>
                                          </ValidationProvider>

                                <div class="form-group">
                                  <p>Чтобы сохранить данные изпользуйте кнопку "Сохранить". Башка кнопкалар жөн эле жаап коёт.</p>
                                  <button class="btn btn-primary" :disabled="!valid">Сохранить</button>
                                </div>
                              </ValidationObserver>
                          </form>
                </div>
          </b-modal>


      <div>
 
          <ag-grid-vue style="width: 100%; height: 350px;"
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
                <button class="btn btn-warning" style="float: left;" v-on:click="onBtnExport()">Экспорт</button>&nbsp;
                <button class="btn btn-danger ml-2"  style="float: left;" v-if="selectedItemExists" v-on:click="updateOrder">Изменить</button> &nbsp;
                <button class="btn btn-success ml-2"  style="float: left;" v-on:click="newOrder()">Заявка</button> &nbsp;
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
import Order from '../../models/order';
import cities from '../Cities';
import columnDefs from './OrderFields';
import {AgGridVue} from "ag-grid-vue";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';


export default {
  name: 'order',
  data: () => {
    return {
      updateModelScreen: false,
      corporateCompanySearch: false,
      filter: new DelFilter(),
      cityList: cities,
      items: [],
      updatedItem: new Order(),
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
      sector:'',
      sectors:[],
      modalsectors:[],
      update: false,
    }
  },
  components: {
      Datepicker,
      AgGridVue
  },
  computed: {
    
    selectedItemExists()
    {
      if(this.updatedItem.orderId.length>0)
        return true;
      else 
        return false;
    }
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
    getOrders()
    {
         HelperService.listOrders(this.$store.getters.getCurrentUser, this.filter).then((response)=>{
            this.items = response;
            
         });
    },
    handleUpdate()
    {
        if(this.update)
        {
          HelperService.updateOrder(this.$store.getters.getCurrentUser, this.updatedItem).then((response)=>{
            this.updateModelScreen = !this.updateModelScreen;
            this. getDeliveries();
          });
        }
        else
        {
           HelperService.saveOrder(this.$store.getters.getCurrentUser, this.updatedItem).then((response)=>{
            this.updateModelScreen = !this.updateModelScreen;
            this. getDeliveries();
          });
        }
    },
    getSenderCustomer()
    {
      if(this.updatedItem.senderPhone.length==10)
          {
            HelperService.getSenderCustomer(this.$store.getters.getCurrentUser, this.updatedItem.senderPhone).then((response)=>{
                this.updatedItem.senderCity = response[0].city;
                this.updatedItem.senderCompany = response[0].company;
                this.updatedItem.senderName = response[0].responsiblePerson;
                this.updatedItem.senderAddress = response[0].address;
             });
          }
    },
    getReceiverCustomer()
    {
      if(this.updatedItem.receiverPhone.length==10)
          {
            HelperService.getSenderCustomer(this.$store.getters.getCurrentUser, this.updatedItem.receiverPhone).then((response)=>{
                this.updatedItem.receiverCity = response[0].city;
                this.updatedItem.receiverCompany = response[0].company;
                this.updatedItem.receiverName = response[0].responsiblePerson;
                this.updatedItem.receiverAddress = response[0].address;
             });
          }
    },
    updateOrder()
    {
      this.update = true;
      if(this.updatedItem!=null || this.updatedItem!='')
        this.updateModelScreen=!this.updateModelScreen;
    },
    newOrder()
    {
      this.update = false;
      this.updatedItem = new Order();
      this.updatedItem.senderPhone = '0';
      this.updateModelScreen=!this.updateModelScreen;
    },
    getSectors()
    {
          HelperService.listSectors(this.$store.getters.getCurrentUser, this.filter.senderCity).then((response)=>{
              this.sectors = response;
          });
    },
    getModalSectors()
    {
          HelperService.listSectors(this.$store.getters.getCurrentUser, this.updatedItem.senderCity).then((response)=>{
              this.modalsectors = response;
          });
    },
    clearFilter() {
        this.filter.acceptedPerson ='';
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

p {
  color: salmon;
}

</style>
