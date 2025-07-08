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
      <div  style="text-align:center">
            <button @click="createPDF">Распечатать все этикетки</button>     <br><br>   
        </div>
        <div class="row">
            <b-card v-for="item in items" :key=item.deliveryId>
             <b>{{item.id}}</b>
              <table class="table">
                  <tr>
                    <td>
                     <b> От Куда:</b> {{item.senderCity}}<br>{{item.senderPhone}}<br><br>
                     <b> Куда:</b>  {{item.receiverCity}}<br>{{item.receiverPhone}}<br><br>
                      
                     <b> Оплата:</b>  {{item.deliveryCost}} {{getPayment(item.paymentType)}}<br>
                     <b> Выкуп:</b>  {{item.deliveryiCost}} <br>
                    </td>
                  </tr>
                  <tr><button @click="createPDFSingle(item)">Распечатать чек</button>       </tr>
              </table>
          </b-card>
        </div>
  </div>

</template>

<script>

import Datepicker from 'vuejs-datepicker';
import UserService from '../../services/userservice';
import moment from 'moment'
import DeliveryService from '../../services/delservice';
import DelFilter from '../../models/delfilter';
import cities from '../Cities';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default {
  name: 'postman-print',
  data: () => {
    return {
      filter: new DelFilter(),
      cityList: cities,
      postmans: [],
      items: [],
    }
  },
  created()
  {
    this.filter.entryDateBegin = new Date();
  },
  components: {
    Datepicker,
  },
  computed: {
  },
  methods: {
      customFormatter(date) {
          return moment(date).format('YYYY-MM-DD');
    },
    getDeliveries()
    {
        this.filter.entryDateBegin = moment(String(this.filter.entryDateBegin)).format('YYYY-MM-DD');
        this.filter.entryDateEnd = moment(String(this.filter.entryDateBegin)).format('YYYY-MM-DD');

        
        DeliveryService.listPostmanAcceptedDeliveries(this.$store.getters.getCurrentUser, this.filter).then((response)=>{
            this.items = response;
            console.log(this.items);
            this.$router.push({ name: 'PostmanPrint', params: { items: this.items }})

         });
    /*
         DeliveryService.listDeliveries(this.$store.getters.getCurrentUser, this.filter, false).then((response)=>{
            this.items = response;
            console.log(this.items);
            this.$router.push({ name: 'PostmanPrint', params: { items: this.items }})

         });*/
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
    getPayment(pay)
    {
      console.log(pay);
      if(pay =='RC')
      {
        return "(Получатель, нал)"
      }
      else if(pay =='SC')
      {
        return "(Отправитель, нал)"
      }
      else if(pay =='RB')
      {
        return "(Получатель, банк)"
      }
      else if(pay =='SB')
      {
        return "(Отправитель, банк)"
      }
    },
    
    createPDF() {

      let rows = [];
      
     
        for (let i = 0; i < this.items.length; i +=1) { 

          let deliveryId = ''+this.items[i].id+'';

          if(i==this.items.length-1)
          {
            rows.push( [ 
            
          {text : ' ', alignment: 'left', fontSize: 5},
          {text : 'TimEX, № '+this.items[i].id+', '+this.items[i].entryDateText.substring(0, 10), alignment: 'left', fontSize: 9, bold: true},
          {text : ' ', alignment: 'left', fontSize: 8},
          {text : 'Оплата: '+this.items[i].deliveryCost+', '+this.getPayment(this.items[i].paymentType), alignment: 'left', fontSize: 9},
          {text : 'Выкуп: '+this.items[i].deliveryiCost, alignment: 'left', fontSize: 9},
          {text : '.', alignment: 'left', fontSize: 5},
          {
                  columns: [
                    {
                      width: '*',
                      text : 
                      this.items[i].senderCity+' ('+this.items[i].senderAddress+')\n'+this.items[i].senderPhone+'\n'+
                      this.items[i].receiverCity+' ('+this.items[i].receiverAddress+')\n'+this.items[i].receiverPhone, alignment: 'left', fontSize: 9
                    },
                    {
                      // auto-sized columns have their widths based on their content
                      width: 'auto',
                      qr: deliveryId, fit: 50,
                    },
                  ],
                  // optional space between columns
                  columnGap: 10
                },
     //     {qr: deliveryId, fit: 60},
          {text : ' ', alignment: 'left', fontSize: 14}, ],);
          }
          else {

            rows.push( [ 
              
            {text : ' ', alignment: 'left', fontSize: 5},
            {text : 'TimEX, № '+this.items[i].id+', '+this.items[i].entryDateText.substring(0, 10), alignment: 'left', fontSize: 9, bold: true},
            {text : ' ', alignment: 'left', fontSize: 8},
            {text : 'Оплата: '+this.items[i].deliveryCost+', '+this.getPayment(this.items[i].paymentType), alignment: 'left', fontSize: 9},
            {text : 'Выкуп: '+this.items[i].deliveryiCost, alignment: 'left', fontSize: 9},
            {text : ' ', alignment: 'left', fontSize: 5},
            {
                    columns: [
                      {
                        width: '*',
                        text : 
                        this.items[i].senderCity+' ('+this.items[i].senderAddress+')\n'+this.items[i].senderPhone+'\n'+
                        this.items[i].receiverCity+' ('+this.items[i].receiverAddress+')\n'+this.items[i].receiverPhone, alignment: 'left', fontSize: 9
                      },
                      {
                        // auto-sized columns have their widths based on their content
                        width: 'auto',
                        qr: deliveryId, fit: 50,
                      },
                    ],
                    // optional space between columns
                    columnGap: 10
                  },
      //     {qr: deliveryId, fit: 60},
            {text : ' ', alignment: 'left', fontSize: 14, pageBreak: 'after', margin: [0, 0, 0, 0]},],);
              }
        }

        var docDefinition = {
            pageSize: {width: 200, height: 143},
            pageMargins: [ 10, 10, 10, 10 ],
            content: [
            
            rows
              ]
            };
          //   pdfMake.createPdf(docDefinition).download("optionalName.pdf");
            // pdfMake.createPdf(docDefinition).open();
          pdfMake.createPdf(docDefinition).print();

      },


      createPDFSingle(item) {

         let rows = [];

          let deliveryId = ''+item.id+'';
          rows.push( [ 
            
          {text : ' ', alignment: 'left', fontSize: 10},
          {text : 'TimEX, № '+item.id+', '+item.entryDateText.substring(0, 10), alignment: 'left', fontSize: 9, bold: true},
          {text : 'Оплата: '+item.deliveryCost+', '+this.getPayment(item.paymentType), alignment: 'left', fontSize: 9},
          {text : 'Выкуп: '+item.deliveryiCost, alignment: 'left', fontSize: 9},
          {text : '.', alignment: 'left', fontSize: 3},
          {
                  columns: [
                    {
                      width: '*',
                      text : 
                      item.senderCity+' ('+item.senderAddress+')\n'+item.senderPhone+'\n'+
                      item.receiverCity+' ('+item.receiverAddress+')\n'+item.receiverPhone, alignment: 'left', fontSize: 9
                    },
                    {
                      // auto-sized columns have their widths based on their content
                      width: 'auto',
                      qr: deliveryId, fit: 50,
                    },
                  ],
                  // optional space between columns
                  columnGap: 10
                },
          {text : ' ', alignment: 'left', fontSize: 27},],);
          
            var docDefinition = {
                pageSize: {width: 200, height:'auto'},
                pageMargins: [ 10, 10, 10, 10 ],
                pageOrientation: 'portrait',
                content: [
                  rows
                ]
                };
            //   pdfMake.createPdf(docDefinition).download("optionalName.pdf");
              // pdfMake.createPdf(docDefinition).open();
              pdfMake.createPdf(docDefinition).print();

          },

    },
    
    
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
