<template>
    <div>
      <div>
        <form @submit.prevent="getData">
              <div class="form-group">
                    <span class="input-group-prepend">
                     <span class="input-group-text">
                          <i class="fa fa-plane"></i>
                      </span>
                      <select v-model="region" class="custom-select">
                          <option v-for="city in cityList" v-bind:key=city.Id> {{ city.name }}</option>
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
            
              <button class="btn btn-primary btn-sm" style="float: right;">Сформировать</button>
          </form>
      </div>
       <br> 
     <br> 

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-secondary">
        {{region }} &nbsp;&nbsp; <i class="fa fa-arrow-right"></i> 
      </ol>
    </nav>
      <div class="col-md-12">
        <div class="row ">
            <div class="col-xl-3 col-lg-6">
                <div class="card">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Отправитель
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                    Сумма: {{soutSC}}<br>
                                    Количество: {{qoutSC}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6">
                <div class="card">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Получатель
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                    Сумма: {{soutRC}}<br>
                                    Количество: {{qoutRC}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6">
                <div class="card">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Получатель через банк
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                     Сумма: {{soutRB}}<br>
                                     Количество: {{qoutRB}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6">
                <div class="card">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Отправитель через банк
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                     Сумма: {{soutSB}}<br>
                                     Количество: {{qoutSB}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <nav aria-label="breadcrumb">
      <ol class="breadcrumb  bg-secondary">
        {{region }} &nbsp;&nbsp; <i class="fa fa-arrow-left"></i> 
      </ol>
    </nav>
      <div class="col-md-12">
        <div class="row ">
            <div class="col-xl-3 col-lg-6">
                <div class="card">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Отправитель
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                      Сумма: {{sincSC}}<br>
                                      Количество: {{qincSC}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6">
                <div class="card">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Получатель
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                      Сумма: {{sincRC}}<br>
                                      Количество: {{qincRC}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6">
                <div class="card">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Получатель через банк
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                      Сумма: {{sincRB}}<br>
                                      Количество: {{qincRB}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6">
                <div class="card">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Отправитель через банк
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                      Сумма: {{sincSB}}<br>
                                      Количество: {{qincSB}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


<!--
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-secondary">
        Шаардан сатып алынгандар (өз ичинде болгондор да)
      </ol>
    </nav>
      <div class="col-md-12">
        <div class="row ">
            <div class="col-xl-4 col-lg-4">
                <div class="card ">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Карызга алынды
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                      Сумма: {{outD}}<br>
                                      Саны: {{qoutD}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4">
                <div class="card ">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Элсомдон төлөндү
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                      Сумма: {{outT}}<br>
                                      Саны: {{qoutT}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4">
                <div class="card">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Нак акча төлөндү
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                      Сумма: {{outC}}<br>
                                      Саны: {{qoutC}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-secondary">
       Башка шаардан тандалган шаарды карай сатып алынгандар
      </ol>
    </nav>
      <div class="col-md-12">
        <div class="row ">
            <div class="col-xl-4 col-lg-4">
                <div class="card ">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Карызга алынды
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                      Сумма: {{incD}}<br>
                                      Саны: {{qincD}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4">
                <div class="card ">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Элсомдон төлөндү
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                      Сумма: {{incT}}<br>
                                      Саны: {{qincT}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4">
                <div class="card ">
                    <div class="card-statistic-3 p-4">
                        <div class="mb-1">
                            Нак акча төлөндү
                        </div>
                        <div class="row align-items-center mb-2 d-flex">
                            <div class="col-12">
                                <h5 class="d-flex align-items-center mb-0">
                                      Сумма: {{incC}}<br>
                                      Саны: {{qincC}}<br>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
-->
  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import cities from '../Cities';
import HelperService from '../../services/helperservice';



export default {
  name: 'region-report',
  data: () => {
    return {
      cityList: cities,
      qoutSC:'',
      qoutRC:'',
      qoutSB:'',
      qoutRB:'',
      qincSC:'',
      qincRC:'',
      qincSB:'',
      qincRB:'',
      soutSC:'',
      soutRC:'',
      soutSB:'',
      soutRB:'',
      sincSC:'',
      sincRC:'',
      sincSB:'',
      sincRB:'',
      outD:'',
      outC:'',
      outT:'',
      qoutD:'',
      qoutC:'',
      qoutT:'',
      incD:'',
      incC:'',
      incT:'',
      qincD:'',
      qincC:'',
      qincT:'',
      collectionDate1:'',
      collectionDate2:'',
      region:'',
      items:[],
    }
  },
  components: {
      Datepicker,
  },
  computed: {

  },
 
  created()
  {
    this.collectionDate1 = new Date();
    this.collectionDate2 = new Date();
  },
  methods: {
   
    getData()
    {
        var date1 = moment(this.collectionDate1).format('YYYY-MM-DD');
        var date2 = moment(this.collectionDate2).format('YYYY-MM-DD');
         HelperService.listRegionData(this.$store.getters.getCurrentUser, this.region, date1, date2).then((response)=>{
            this.items = response;
            console.log(this.items);
            this.takeFields(this.items);
         });
    },

    zero()
    {
      this.qoutSC=0;
      this.qoutRC=0;
      this.qoutSB=0;
      this.qoutRB=0;
      this.qincSC=0;
      this.qincRC=0;
      this.qincSB=0;
      this.qincRB=0;
      this.soutSC=0;
      this.soutRC=0;
      this.soutSB=0;
      this.soutRB=0;
      this.sincSC=0;
      this.sincRC=0;
      this.sincSB=0;
      this.sincRB=0;
      this.outD=0;
      this.outC=0;
      this.outT=0;
      this.qoutD=0;
      this.qoutC=0;
      this.qoutT=0;
      this.incD=0;
      this.incC=0;
      this.incT=0;
      this.qincD=0;
      this.qincC=0;
      this.qincT=0;
    },
    takeFields(items) {
        var i;
        this.zero();
        this.totalExpense = 0;
        for (i = 0; i < items.length; i++) {
            if(items[i].paymentType == 'SC' && items[i].direction == 'OC')
            {
              this.qoutSC = items[i].quantity;
              this.soutSC = items[i].totalAmount;
            }
            else if(items[i].paymentType == 'RC' && items[i].direction == 'OC')
            {
              this.qoutRC = items[i].quantity;
              this.soutRC = items[i].totalAmount;
            }
            else if(items[i].paymentType == 'SB' && items[i].direction == 'OC')
            {
              this.qoutSB = items[i].quantity;
              this.soutSB = items[i].totalAmount;
            }
            else if(items[i].paymentType == 'RB' && items[i].direction == 'OC')
            {
              this.qoutRB = items[i].quantity;
              this.soutRB = items[i].totalAmount;
            }
            else if(items[i].paymentType == 'SC' && items[i].direction == 'IC')
            {
              this.qincSC = items[i].quantity;
              this.sincSC = items[i].totalAmount;
            }
            else if(items[i].paymentType == 'RC' && items[i].direction == 'IC')
            {
              this.qincRC = items[i].quantity;
              this.sincRC = items[i].totalAmount;
            }
            else if(items[i].paymentType == 'SB' && items[i].direction == 'IC')
            {
              this.qincSB = items[i].quantity;
              this.sincSB = items[i].totalAmount;
            }
            else if(items[i].paymentType == 'RB' && items[i].direction == 'IC')
            {
              this.qincRB = items[i].quantity;
              this.sincRB = items[i].totalAmount;
            }
            else if(items[i].paymentType == 'D' && items[i].direction == 'OB')
            {
              this.outD = items[i].quantity;
              this.qoutD = items[i].totalAmount;
            }
             else if(items[i].paymentType == 'C' && items[i].direction == 'OB')
            {
              this.outC = items[i].quantity;
              this.qoutC = items[i].totalAmount;
            }
             else if(items[i].paymentType == 'T' && items[i].direction == 'OB')
            {
              this.outT = items[i].quantity;
              this.qoutT = items[i].totalAmount;
            }
            else if(items[i].paymentType == 'D' && items[i].direction == 'IB')
            {
              this.incD = items[i].quantity;
              this.qincD = items[i].totalAmount;
            }
             else if(items[i].paymentType == 'C' && items[i].direction == 'IB')
            {
              this.incC = items[i].quantity;
              this.qincC = items[i].totalAmount;
            }
             else if(items[i].paymentType == 'T' && items[i].direction == 'IB')
            {
              this.incT = items[i].quantity;
              this.qincT = items[i].totalAmount;
            }
        }
    },
    customFormatter(date) {
          return moment(date).format('YYYY-MM-DD');
    },
  }
}
</script>

<style scoped lang="scss">

.card {
    background-color: #fff;
    border-radius: 10px;
    border: none;
    position: relative;
    margin-bottom: 30px;
    box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,0.1), 0 0.9375rem 1.40625rem rgba(90,97,105,0.1), 0 0.25rem 0.53125rem rgba(90,97,105,0.12), 0 0.125rem 0.1875rem rgba(90,97,105,0.1);
}
.l-bg-cherry {
    background: linear-gradient(to right, #493240, #f09) !important;
    color: #fff;
}

.l-bg-blue-dark {
    background: linear-gradient(to right, #373b44, #4286f4) !important;
    color: #fff;
}

.l-bg-green-dark {
    background: linear-gradient(to right, #0a504a, #38ef7d) !important;
    color: #fff;
}

.l-bg-orange-dark {
    background: linear-gradient(to right, #a86008, #ffba56) !important;
    color: #fff;
}

.card .card-statistic-3 .card-icon-large .fas, .card .card-statistic-3 .card-icon-large .far, .card .card-statistic-3 .card-icon-large .fab, .card .card-statistic-3 .card-icon-large .fal {
    font-size: 110px;
}

.card .card-statistic-3 .card-icon {
    text-align: center;
    line-height: 50px;
    margin-left: 15px;
    color: #000;
    position: absolute;
    right: -5px;
    top: 20px;
    opacity: 0.1;
}

.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}

.l-bg-green {
    background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important;
    color: #fff;
}

.l-bg-orange {
    background: linear-gradient(to right, #f9900e, #ffba56) !important;
    color: #fff;
}

.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}

</style>
