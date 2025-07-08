const fields= [
  {
    field: 'senderCity',
    headerName: 'От Куда',
    sortable: true, 
    filter: true,
    width: 180,
    resizable: true,
  },
  {
    field: 'receiverCity',
    headerName: 'Куда',
    sortable: true, 
    filter: true,
    width: 180, 
    resizable: true
    },
  {
    field: 'amount1',
    headerName: 'Сумма выкупа',
    sortable: true, 
    filter: true,
    width: 140,
    resizable: true,  
    aggFunc: "sum",
    },
   {
     field: 'amount2',
     headerName: 'Доставка +',
     sortable: true, 
     filter: true,
     width: 120,
     resizable: true
   },
   {
     field: 'amount3',
     headerName: 'Доставка -',
     sortable: true, 
     filter: true,
     width: 120,
     resizable: true
   },
   {
     field: 'amount4',
     headerName: 'Через Банк',
     sortable: true, 
     filter: true,
     width: 120,
     resizable: true
   },
   {
     field: 'amount5',
     headerName: 'Количество',
     sortable: true, 
     width: 120,
     resizable: true
   },
  
 ]

export default fields
