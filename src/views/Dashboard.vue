<template>
  <div class="animated fadeIn">
  
    <button class="btn btn-secondary mr-2 btn-sm mb-2" v-if="userIsAdmin" v-on:click="getData()">Графиктерди көрсөт</button> 
   <!-- <button class="btn btn-secondary mr-2" v-if="userIsAdmin" v-on:click="expenses()">Расходдор</button>--> 
    <button class="btn btn-secondary mr-2 btn-sm mb-2" v-if="userIsAdmin" v-on:click="regionReport()">Регион Отчёт</button>
   <!--<button class="btn btn-secondary mr-2" v-if="userIsAdmin" v-on:click="sectorPage()">Участки</button>--> 
    <br>    
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body class="bg-secondary" header="Последние 30 дней">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{totalDaily}}</h4>
          </b-card-body>
          <b-card-body class="pb-0"></b-card-body>
          <card-bar-chart-daily chartId="card-chart-02" class="chart-wrapper px-3" style="height:180px;" :height="70" :deliveryData="dailyDelivery"/>
        </b-card>
      </b-col>
      <b-col sm="12" lg="12">
        <b-card no-body class="bg-secondary" header="Годовая статистика по месяцам">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{totalNumber}}</h4>
          </b-card-body>
          <b-card-body class="pb-0"></b-card-body>
          <card-bar-chart-example chartId="card-chart-02" class="chart-wrapper px-3" style="height:180px;" :height="70" :deliveryData="totalDelivery"/>
        </b-card>
      </b-col>
  <!--    <b-col sm="6" lg="6">
        <b-card no-body class="bg-secondary" header="Жылдык нак төлөнчүлөрдүн саны">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{totalCash}}</h4>
          </b-card-body>
          <b-card-body class="pb-0"></b-card-body>
          <card-bar-chart-example chartId="card-chart-04" class="chart-wrapper px-3" style="height:200px;" :height="70" :deliveryData="cashDelivery"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="6">
        <b-card no-body class="bg-secondary" header="Жылдык бантан төлөнчүлөрдүн саны">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{totalBank}}</h4>
          </b-card-body>
          <b-card-body class="pb-0"></b-card-body>
          <card-bar-chart-example chartId="card-chart-05" class="chart-wrapper px-3" style="height:200px;" :height="70" :deliveryData="bankDelivery"/>
        </b-card>
      </b-col>
    -->
    </b-row>
    
  </div>
</template>

<script>

import CardLine2ChartExample from './charts/CardLine2ChartExample'
import CardBarChartExample from './charts/CardBarChartExample'
import CardBarChartDaily from './charts/CardBarChartDaily'
import BarExample from './charts/BarExample'
import DoughnutExample from './charts/DoughnutExample'
import PieExample from './charts/PieExample'
import HelperService from '../services/helperservice';

export default {
  name: 'dashboard',
  components: {
    CardLine2ChartExample,
    CardBarChartDaily,
    CardBarChartExample,
    BarExample,
    DoughnutExample,
    PieExample,
  },
  data: function () {
    return {
      totalNumber:'',
      totalCash:'',
      totalBank:'',
      totalDaily:'',
      totalDelivery:'',
      bankDelivery:'',
      cashDelivery:'',
      dailyDelivery:'',
      userIsAdmin: false
    }
  },
  computed:{
     
  },
  methods: {
    sectorPage()
    {
      this.$router.push({ name: 'Sectors' })
    },
    regionReport()
    {
      this.$router.push({ name: 'RegionReport' })
    },
    expenses()
    {
      this.$router.push({ name: 'expenses' })
    },
    getData()
    {
        HelperService.getData(this.$store.getters.getCurrentUser).then((response)=>{
          this.totalDelivery = response[0];
          this.cashDelivery = response[1];
          this.bankDelivery = response[2];
          this.dailyDelivery = response[3];
          this.totals();
          }).catch(error=>{
            console.log(error);
          });
    },
    totals()
     {
       this.totalNumber = 0;
       this.totalCash = 0;
       this.totalBank = 0;
        var total = 0;
         this.totalDelivery.forEach(function (item, index) {
          total = total+item;
        });
         this.totalNumber = total;
         total = 0;
         this.cashDelivery.forEach(function (item, index) {
          total = total+item;
        });
         this.totalCash = total;
         total = 0;
          this.bankDelivery.forEach(function (item, index) {
          total = total+item;
        });
         this.totalBank = total;
          total = 0;
          this.dailyDelivery.forEach(function (item, index) {
          total = total+item;
        });
         this.totalDaily = total;
     }
  },
  created()
  {   
     if(this.$store.getters.getCurrentUser.role=='ADMIN')
      this.userIsAdmin = true;
    else
      this.userIsAdmin = false; 

    }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
