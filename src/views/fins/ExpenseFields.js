const fields= [
  {
    field: 'amount',
    headerName: 'Сумма',
    sortable: true, 
    filter: true,
    width: 80,
    resizable: true
  },
  {
    field: 'expenseDate',
    headerName: 'Дата',
    sortable: true, 
    filter: true,
    width: 120,
    resizable: true
    },
  {
    field: 'createdDate',
    headerName: 'Дата ввода',
    sortable: true, 
    filter: true,
    width: 120,
    resizable: true
    },
   {
     field: 'city',
     headerName: 'Город',
     sortable: true, 
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'enteredUser',
     headerName: 'Пользователь',
     sortable: true, 
     filter: true,
     width: 150,
     resizable: true
   },
   {
     field: 'explanation',
     headerName: 'Примечание',
     sortable: true, 
     filter: true,
     resizable: true
   },
 ]

export default fields
