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

                      <span class="input-group-text">
                          <i class="fa fa-user-circle"></i>
                      </span>
                      <select v-model="filter.acceptedPerson" class="custom-select">
                        <option v-for="postman in postmans" v-bind:key=postman.Id> {{ postman.email }}</option>
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

                <button class="btn btn-primary btn-sm" :disabled="!valid">Сформировать список</button>&nbsp;
                <button class="btn btn-secondary btn-sm" v-on:click="clearFilter()">Очистить фильтр</button>&nbsp;
                <button class="btn btn-danger btn-sm"  v-on:click="updateModelScreen=!updateModelScreen" v-if="userIsAdmin">Изменить</button> &nbsp;
                <download-excel
                  class   = "btn btn-primary btn-sm mr-2"
                  style="float: right"
                  :data   = "items"
                  :fields = "json_fields"
                  worksheet = "My Worksheet"
                  name    = "Посылки.xls">
                  Экспортировать в Excel
                </download-excel>
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
                                      <span class="input-group">
                                        <ValidationProvider name="Ot Kuda" rules="required" v-slot="{ errors }">
                                          <select v-model="updatedItem.senderCity" class="custom-select">
                                              <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                                          </select>
                                          <div><p>{{ errors[0] }}</p></div>
                                          </ValidationProvider>
                                          <ValidationProvider name="Kuda" rules="required" v-slot="{ errors }">
                                          <input type="text" v-model="updatedItem.senderPhone"  id="senderPhone" class="form-control"/>
                                          <div><p>{{ errors[0] }}</p></div>
                                          </ValidationProvider>
                                          <ValidationProvider name="Kuda" rules="required" v-slot="{ errors }">
                                          <input type="text" v-model="updatedItem.senderName"  id="senderName" class="form-control"/>
                                          <div><p>{{ errors[0] }}</p></div>
                                          </ValidationProvider>
                                      </span>
                                      <span class="input-group">
                                          <ValidationProvider name="Kuda" rules="required" v-slot="{ errors }">
                                          <input type="text" v-model="updatedItem.senderCompany"  id="senderCompany" class="form-control"/>
                                          <div><p>{{ errors[0] }}</p></div>
                                          </ValidationProvider>
                                          <ValidationProvider name="Kuda" rules="required" v-slot="{ errors }">
                                          <input type="text" v-model="updatedItem.senderAddress"  id="senderAddress" class="form-control"/>
                                          <div><p>{{ errors[0] }}</p></div>
                                          </ValidationProvider>
                                      </span>
                                    </div>

                                    <div class="form-group">
                                      <span class="input-group-text">
                                          Получатель:
                                        </span>
                                      <span class="input-group">
                                          <ValidationProvider name="Ot Kuda" rules="required" v-slot="{ errors }">
                                          <select v-model="updatedItem.receiverCity" class="custom-select">
                                              <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                                          </select>
                                          <div><p>{{ errors[0] }}</p></div>
                                          </ValidationProvider>
                                          <ValidationProvider name="Kuda" rules="required" v-slot="{ errors }">
                                          <input type="text" v-model="updatedItem.receiverPhone"  id="receiverPhone" class="form-control"/>
                                          <div><p>{{ errors[0] }}</p></div>
                                          </ValidationProvider>
                                          <ValidationProvider name="Kuda" rules="required" v-slot="{ errors }">
                                          <input type="text" v-model="updatedItem.receiverName"  id="receiverName" class="form-control"/>
                                          <div><p>{{ errors[0] }}</p></div>
                                          </ValidationProvider>
                                        </span>
                                        <span class="input-group">
                                          <ValidationProvider name="Kuda" rules="required" v-slot="{ errors }">
                                          <input type="text" v-model="updatedItem.receiverCompany"  id="receiverCompany" class="form-control"/>
                                          <div><p>{{ errors[0] }}</p></div>
                                          </ValidationProvider>
                                          <ValidationProvider name="Kuda" rules="required" v-slot="{ errors }">
                                          <input type="text" v-model="updatedItem.receiverAddress"  id="receiverAddress" class="form-control"/>
                                           <div><p>{{ errors[0] }}</p></div>
                                          </ValidationProvider>
                                      </span>
                                    </div>

                                    <div class="form-group">
                                      <span class="input-group-text">
                                          Отправка:
                                        </span>
                                      <span class="input-group">
                                        <ValidationProvider name="Kuda" rules="required" v-slot="{ errors }">
                                          <select name="group" class="custom-select" v-model="updatedItem.deliveryType">
                                              <option value="ДОКУМЕНТ">ДОКУМЕНТ</option>
                                              <option value="КОРОБКА">КОРОБКА</option>
                                              <option value="КОНВЕРТ">КОНВЕРТ</option>
                                              <option value="ПАКЕТ">ПАКЕТ</option>
                                              <option value="ДРУГОЕ">ДРУГОЕ</option>
                                          </select>
                                          <div><p>{{ errors[0] }}</p></div>
                                        </ValidationProvider>
                                        <ValidationProvider name="Ot Kuda" rules="required" v-slot="{ errors }">
                                          <input type="number" v-model="updatedItem.deliveryCount"  id="deliveryCount" class="form-control"/>
                                          <div><p>{{ errors[0] }}</p></div>
                                        </ValidationProvider>
                                      </span>
                                    </div>

                                     <div class="form-group">
                                       <span class="input-group-text">
                                            Оплата
                                          </span>
                                      <span class="input-group">
                                        <ValidationProvider name="Ot Kuda" rules="required" v-slot="{ errors }">
                                          <input type="number" v-model="updatedItem.deliveryCost"  id="deliveryCost" class="form-control"/>
                                          <div><p>{{ errors[0] }}</p></div>
                                        </ValidationProvider>
                                        <ValidationProvider name="Kuda" rules="required" v-slot="{ errors }">
                                          <select name="group" class="custom-select" v-model="updatedItem.paymentType" @change="onPaymentChange($event)">
                                              <option value="SC">Отправитель наличными</option>
                                              <option value="RC">Получатель наличными</option>
                                              <option value="SB">Отправитель: перевод через банк</option>
                                              <option value="RB">Получатель: перевод через банк</option>
                                          </select>
                                          <div><p>{{ errors[0] }}</p></div>
                                        </ValidationProvider>
                                          <input type="number" v-model="updatedItem.paidAmount"  id="paidAmount" class="form-control"/>
                                      </span>
                                    </div>

                                    <div class="form-group">
                                      <span class="input-group-text">
                                            Выкуп
                                          </span>
                                      <span class="input-group">
                                          <input type="number" v-model="updatedItem.deliveryiCost"  id="deliveryiCost" class="form-control"/>
                                          <select name="group" class="custom-select" v-model="updatedItem.buyType">
                                              <option value="D">Карызга алынды</option>
                                              <option value="T">Трансфер кылынды (элсом..)</option>
                                              <option value="C">Нак акча төлөндү</option>
                                          </select>
                                      </span>
                                    </div>

                                    <div class="form-group">
                                        <span class="input-group">
                                          <span class="input-group-text">
                                          Получил
                                          </span>
                                        <input type="text" v-model="updatedItem.receiver"  id="receiver" class="form-control"/>
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <span class="input-group">
                                           <span class="input-group-text">
                                          Примечание
                                          </span>
                                        <input type="text" v-model="updatedItem.deliveryExplanation"  id="expenseExplanation" class="form-control" />
                                        </span>
                                    </div>

                                <div class="form-group">
                                  <p>Чтобы сохранить данные изпользуйте кнопку "Сохранить". Башка кнопкалар жөн эле жаап коёт.</p>
                                  <button class="btn btn-primary" :disabled="!valid">Сохранить</button>
                                </div>
                              </ValidationObserver>
                          </form>
                </div>
          </b-modal>


          <b-modal size="lg" v-model="corporateCompanySearch">
            <div class="jumbotron">
                  <form @submit.prevent="searchCustomer">
                            <div class="form-group">
                              <span class="input-group">
                                  <select v-model="searchCity" class="custom-select">
                                      <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
                                  </select>
                              </span>
                            </div>

                            <div class="form-group">
                                <span class="input-group">
                                <input type="text" v-model="searchName"  id="receiver" class="form-control"/>
                                </span>
                            </div>

                        <div class="form-group">
                          <button class="btn btn-primary">Изде</button>
                        </div>
                          <b-card>
                            <div slot="header">Tests</div>
                              <table class="table table-striped table-hover">
                                <tbody>
                                      <!-- define your own table row -->
                                  <tr>
                                    <th>Фирма</th>
                                    <th>Адрес</th>
                                    <th>Танда</th>
                                  </tr>
                                  <tr v-for="customer in customers" :key=customer.customerId>
                                    <td>{{customer.company}}</td>
                                    <td>{{customer.address}}</td>
                                    <td>
                                      <b-button  size="sm" variant="warning" v-on:click="selectCompany(customer)"><i class="fa fa-edit"></i> </b-button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                          </b-card>
                    
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
import columnDefs from './Fields';
import {AgGridVue} from "ag-grid-vue";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';



export default {
  name: 'del-list',
  data: () => {
    return {
      code: 11111,
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
      searchCity: '',
      searchName: '',
      paymentType: '',
      userIsAdmin: false,
      json_fields: 
        {
          'Номер': 'id',
          'Статус': 'status',
          'Изм.': 'updatedUser',
          'Дата' : 'entryDateText',
          'От куда': 'senderCity',
          'Тел. Отпр.': 'senderPhone',
          'Адрес Отпр.': 'senderAddress',
          'Куда': 'receiverCity',
          'Тел. Пол.': 'receiverPhone',
          'Адрес Пол.': 'receiverAddress',
          'Тип Отпр.': 'deliveryType',
          'Кол.': 'deliveryCount',
          'Оплата': 'deliveryCost',
          'Оплатил': 'paidAmount',
          'Тип оплаты': 'paymentType',
          'Оплата выкупа': 'buyType',
          'Сумма выкупа': 'deliveryiCost',
          'Примечание': 'deliveryExplanation',
          'Курьер получ.': 'acceptedPerson',
          'Курьер достав.': 'deliveredPerson',
          'Дата достав.': 'deliveredDateText',
          'Получатель': 'receiver',
          'Изменил': 'updatedUser',
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
    this.listPostmans();
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
    onPaymentChange(event) {
      this.paymentType = event.target.value;
      if(this.paymentType == "SB")
      {
        this.searchCity = this.updatedItem.senderCity;
        this.corporateCompanySearch = !this.corporateCompanySearch;
      }
      else if(this.paymentType == "RB")
      {
        this.searchCity = this.updatedItem.receiverCity;
          this.corporateCompanySearch = !this.corporateCompanySearch;
      }
    },
    selectCompany(customer)
    {
      if(this.paymentType == "SB")
      {
        this.updatedItem.senderCompany = customer.company;
        this.updatedItem.senderAddress = customer.address;
      }
      else if(this.paymentType == "RB")
      {
        this.updatedItem.receiverCompany = customer.company;
        this.updatedItem.receiverAddress = customer.address;
      }
      this.corporateCompanySearch = false;
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
        this.filter.entryDateEnd = moment(String(this.filter.entryDateEnd)).format('YYYY-MM-DD');
         DeliveryService.listDeliveries(this.$store.getters.getCurrentUser, this.filter, false).then((response)=>{
            this.items = response;
            
         });
    },
    handleUpdate()
    {
      if(this.updatedItem!=null)
      {
          DeliveryService.updateDelivery(this.$store.getters.getCurrentUser, this.updatedItem).then((response)=>{
            this.updateModelScreen = !this.updateModelScreen;
            this. getDeliveries();
         });
      }
    },
    searchCustomer()
    {
      if(this.updatedItem!=null)
      {
          HelperService.listCustomers(this.$store.getters.getCurrentUser, this.searchCity, this.searchName).then((response)=>{
            this.customers = response;
         });
      }
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
