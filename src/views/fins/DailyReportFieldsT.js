const fields= [
  {
    field: 'senderCity',
    headerName: 'От Куда',
    width: 180,
    resizable: true,
  },
  {
    field: 'receiverCity',
    headerName: 'Куда',
    width: 180, 
    resizable: true
    },
  {
    field: 'amount1',
    headerName: 'Сумма выкупа',
    width: 140,
    resizable: true,  
    aggFunc: "sum",
    },
   {
     field: 'amount2',
     headerName: 'Доставка +',
     width: 120,
     resizable: true
   },
   {
     field: 'amount3',
     headerName: 'Доставка -',
     width: 120,
     resizable: true
   },
   {
     field: 'amount4',
     headerName: 'Через Банк',
     width: 120,
     resizable: true
   },
   {
     field: 'amount5',
     headerName: 'Количество',
     width: 120,
     resizable: true
   },
  
 ]

export default fields
