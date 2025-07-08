const fields= [
  
  {
    field: 'expenseDate',
    headerName: 'Дата',
    sortable: true, 
    filter: true,
    width: 95,
    resizable: true
  },
  {
    field: 'amount',
    headerName: 'Сумма',
    sortable: true, 
    filter: true,
    width: 80,
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
    field: 'createdDate',
    headerName: 'Дата ввода',
    sortable: true, 
    filter: true,
    width: 95,
    resizable: true
  },
   {
    field: 'updatedDate',
    headerName: 'Дата измен.',
    sortable: true, 
    filter: true,
    width: 95,
    resizable: true
  },
   {
     field: 'updatedUser',
     headerName: 'Пользователь измен.',
     sortable: true, 
     filter: true,
     width: 150,
     resizable: true
   },
 ]

export default fields
