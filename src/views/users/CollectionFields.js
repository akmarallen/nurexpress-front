const fields= [
  {
    field: 'amount',
    headerName: 'Сумма',
    sortable: true, 
    filter: true,
    width: 70,
    resizable: true,
    cellStyle: function(params) {
     if (params.value > 0) {
         return {color: 'black', backgroundColor: 'lightgreen'};
     } else {
       return {color: 'black', backgroundColor: 'lightsalmon'};
     } 
   }
  },
  {
    field: 'paymentType',
    headerName: 'Тип оплаты',
    sortable: true, 
    filter: true,
    width: 130, 
    resizable: true
    },
  {
    field: 'entryDate',
    headerName: 'Дата',
    sortable: true, 
    filter: true,
    width: 100,
    resizable: true
    },
   {
     field: 'senderCity',
     headerName: 'От куда',
     sortable: true, 
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'receiverCity',
     headerName: 'Куда',
     sortable: true, 
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'phone',
     headerName: 'Телефон',
     sortable: true, 
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'name',
     headerName: 'Имя',
     sortable: true, 
     filter: true,
     width: 200,
     resizable: true
   },
   {
     field: 'address',
     headerName: 'Адрес',
     sortable: true, 
     filter: true,
     width: 200,
     resizable: true
   },
 ]

export default fields
