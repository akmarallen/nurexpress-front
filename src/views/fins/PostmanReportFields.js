const fields= [
  {
    field: 'date',
    headerName: 'Дата',
    filter: true,
    width: 90,
    resizable: true
  },
  {
    field: 'senderPaid',
    headerName: 'Отправитель',
    filter: true,
    width: 120,
    resizable: true
  },
  {
    field: 'receiverPaid',
    headerName: 'Получатель',
    filter: true,
    width: 120,
    resizable: true
    },
  {
    field: 'boughtWithCash',
    headerName: 'Выкуп (наличка)',
    filter: true,
    width: 150,
    resizable: true
    },
   {
     field: 'boughtCollect',
     headerName: 'Выкуп (оплата)',
     filter: true,
     width: 130,
     resizable: true
   },
   {
     field: 'debtPaid',
     headerName: 'Оплата долга',
     filter: true,
     width: 150,
     resizable: true
   },
   {
     field: 'total',
     headerName: 'Общ.',
     width: 100,
     filter: true,
     resizable: true
   },
   {
     field: 'transaction',
     headerName: 'Подотчёт',
     width: 120,
     filter: true,
     resizable: true
   },
   {
    field: 'diff',
    headerName: 'Всего',
    width: 120,
    filter: true,
    resizable: true
  },
 ]

export default fields
