const fields= [
    {
      field: 'status',
      headerName: 'Статус',
      sortable: true, 
      filter: true,
      suppressSizeToFit: true,
      width: 50,
      resizable: true,
    },
    {
      field: 'entryDate',
      headerName: 'Дата',
      sortable: true, 
      filter: true,
      suppressSizeToFit: true,
      width: 100,
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
      field: 'paymentType',
      headerName: 'Тип оплаты',
      sortable: true, 
      filter: true,
      width: 50,
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
    field: 'deliveryiCost',
    headerName: 'Сумма выкупа',
    sortable: true, 
    filter: true,
    width: 100,
    resizable: true,
    aggFunc: "sum",
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
  {
    field: 'acceptedPerson',
    headerName: 'Курьер получ.',
    sortable: true, 
    filter: true,
    width: 120,
    resizable: true
  },
  {
    field: 'costPaidUser',
    headerName: 'Курьер опла. долг.',
    sortable: true, 
    filter: true,
    width: 100,
    resizable: true
  },
  {
    field: 'costPaidDate',
    headerName: 'Дата опла. долг.',
    sortable: true, 
    filter: true,
    width: 100,
    resizable: true
  },
  {
    field: 'deliveredPerson',
    headerName: 'Курьер достав.',
    sortable: true, 
    filter: true,
    width: 120,
    resizable: true
  },
  {
    field: 'deliveredDate',
    headerName: 'Дата достав.',
    sortable: true, filter: true,
    width: 100,
    resizable: true
  },
  {
    field: 'receiver',
    headerName: 'Получатель',
    sortable: true, 
    filter: true,
    resizable: true
  },
  {
    field: 'updatedUser',
    headerName: 'Изменил',
    sortable: true, 
    filter: true,
    width: 100,
    resizable: true
  },
  {
    field: 'updatedDate',
    headerName: 'Дата измен.',
    sortable: true, 
    filter: true,
    width: 130,
    resizable: true
  },
  
 ]

 
export default fields
