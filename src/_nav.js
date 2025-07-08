export default {
  items: [
    {
      name: 'Главная',
      url: '/dashboard',
      icon: 'icon-speedometer',
      variant: 'danger',
    },
    {
      name: 'Посылки',
      url: '/dels/del-list',
      icon: 'icon-list',
    },
    {
      name: 'Измененные',
      url: '/dels/del-updated',
      icon: 'icon-list',
      
    },
    {
      name: 'Отчет (город)',
      url: '/fins/daily-report',
      icon: 'icon-list',
    },
    {
      name: 'Отчет (долг)',
      url: '/dels/del-debted',
      icon: 'icon-list',
    },
    {
      name: 'Отчет (банк)',
      url: '/dels/del-bank',
      icon: 'icon-list',
    },
    {
      name: 'Отчет курьера',
      url: '/users/postman-collections',
      icon: 'icon-user-follow',
    },
    {
      name: 'Этикетки',
      url: '/dels/postman-print',
      icon: 'icon-list',
    },
     /*  {
      name: 'Курьер подотчёт',
      url: '/fins/podotchet',
      icon: 'icon-user-follow',
    },
    {
      name: 'Курьер общ. отчёт',
      url: '/fins/postmanreport',
      icon: 'icon-user-follow',
    },
    {
      name: 'Курьер Список',
      url: '/users/postmans',
      icon: 'icon-user-follow',
    },
 
    {
      name: 'Финанс',
      url: '/payment',
      icon: 'icon-wallet',
      children: [
        {
          name: 'Оплаты',
          url: '/payment',
          icon: ''
        },
        {
          name: 'Инкассация',
          url: '/payment/incassa',
          icon: ''
        },
      ]
    },
    {
      name: 'Товары',
      url: '/goods',
      icon: 'icon-notebook',
      children: [
        {
          name: 'Покупка товаров',
          url: '/goods/goods-buy',
          icon: ''
        },
        {
          name: 'Продажа товаров',
          url: '/goods/goods-sell',
          icon: ''
        },
        
      ]
    },*/
    {
      divider: true
    },
      /*
    {
      title: true,
      name: 'Интенсив'
    },   

    {
      name: 'Группы',
      url: '/groups',
      icon: 'icon-book-open',
      children: [
        {
          name: 'Интенс (русский)',
          url: '/group/group-list-intenser',
          icon: ''
        },
        {
          name: 'Интенс (кыргыз)',
          url: '/group/group-list-intensek',
          icon: ''
        },
      ]
    },*/
    /*
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-paper-plane',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
        }
      ]
    },*/
    {
      name: 'Логин',
      url: '/pages/Login',
      icon: 'icon-layers',
      variant: 'warning',
    },
  ]
}
