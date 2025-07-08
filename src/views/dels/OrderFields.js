const fields= [
    {
      field: 'status',
      headerName: 'Статус',
      sortable: true, 
      filter: true,
      suppressSizeToFit: true,
      width: 50,
      resizable: true,
      cellRenderer: function(params) {
          var element = document.createElement("span");
          var imageElement = document.createElement("img");
          // visually indicate if this months value is higher or lower than last months value
          if (params.value == 1) {
              imageElement.src = "http://yldam.nova.kg/images/icon_green.png";
          } 
          else {
              imageElement.src = "http://yldam.nova.kg/images/icon_yellow.png";
          }
          element.appendChild(imageElement);
          element.appendChild(document.createTextNode(params.value));
          return element;
      },
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
      field: 'assignedSector',
      headerName: 'Участок',
      sortable: true, 
      filter: true,
      width: 120,
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
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'senderName',
     headerName: 'Отправитель',
     sortable: true, 
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'senderCompany',
     headerName: 'Фирма',
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
     field: 'receiverPhone',
     headerName: 'Тел. Пол.',
     filter: true,
     width: 100,
     resizable: true
   },
   {
     field: 'receiverName',
     headerName: 'Получатель',
     width: 100,
     sortable: true, filter: true,
     resizable: true
   },
   {
     field: 'receiverCompany',
     headerName: 'Фирма',
     width: 100,
     sortable: true, filter: true,
     resizable: true
   },
   {
    field: 'explanation',
    headerName: 'Примечание',
    sortable: true, 
    filter: true,
    resizable: true
  },
  {
    field: 'updatedUser',
    headerName: 'Курьер измен.',
    sortable: true, 
    filter: true,
    width: 140,
    resizable: true
  },
  {
    field: 'updatedDate',
    headerName: 'Дата измен.',
    sortable: true, 
    filter: true,
    width: 140,
    resizable: true
  },
 ]

 
export default fields
