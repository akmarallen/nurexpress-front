const fields= [
    {
      field: 'id',
      headerName: 'Номер',
      sortable: true, 
      filter: true,
      suppressSizeToFit: true,
      width: 100,
      resizable: true,
      
    },
    {
      field: 'entryDateText',
      headerName: 'Дата',
      sortable: true, 
      filter: true,
      suppressSizeToFit: true,
      width: 110,
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
     field: 'senderPhone',
     headerName: 'Тел. Отпр.',
     sortable: true, 
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'senderName',
     headerName: 'Отправитель',
     sortable: true, 
     filter: true,
     resizable: true
   },
   {
     field: 'senderCompany',
     headerName: 'Фирма',
     sortable: true, 
     filter: true,
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
     field: 'receiverPhone',
     headerName: 'Тел. Пол.',
     sortable: true, 
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'receiverName',
     headerName: 'Получатель',
     sortable: true, filter: true,
     resizable: true
   },
   {
     field: 'receiverCompany',
     headerName: 'Фирма',
     sortable: true, filter: true,
     resizable: true
   },
   {
     field: 'deliveryType',
     headerName: 'Тип Отпр.',
     sortable: true, 
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'deliveryCount',
     headerName: 'Кол.',
     sortable: true, 
     filter: true,
     width: 50,
     resizable: true
   },
   {
     field: 'deliveryCost',
     headerName: 'Оплата',
     sortable: true, 
     filter: true,
     width: 100,
     resizable: true
   },
   {
    field: 'paidAmount',
    headerName: 'Оплатил',
    sortable: true, 
    filter: true,
    width: 100,
    resizable: true
  },
   {
     field: 'paymentType',
     headerName: 'Тип оплаты',
     sortable: true, 
     filter: true,
     width: 50,
     resizable: true
   },
   {
     field: 'deliveryiCost',
     headerName: 'Сумма выкупа',
     sortable: true, 
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'buyType',
     headerName: 'Оплата выкупа',
     sortable: true, 
     filter: true,
     width: 50,
     resizable: true
   },
   {
    field: 'deliveryExplanation',
    headerName: 'Примечание',
    sortable: true, 
    filter: true,
    resizable: true
  },

 ]

 
export default fields
