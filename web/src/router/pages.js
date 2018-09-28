let pages = [
  {
    path : '/',
    component : resolve => require(['@/views/login'], resolve), 
  },
  {
    path : '/index.html',
    component : resolve => require(['@/views/login'], resolve), 
  },
  {
    path : '/index.htm',
    component : resolve => require(['@/views/login'], resolve), 
  },
  {
    path : '/login',
    component : resolve => require(['@/views/login'], resolve), 
  },
  {
    path: '/404',
    component : resolve => require(['@/views/404'], resolve), 
  },
  {
    path : '*',
    redirect : '/404',
  },
  {
    path : '',
    component : resolve => require(['@/views/layout'], resolve), 
    children : [
      {
        path : '/list',
        component : resolve => require(['@/views/list'], resolve), 
        meta : {
          name : '/list',
        },
      },
      {
        path : '/demo',
        component : resolve => require(['@/views/demo'], resolve), 
        meta : {
          name : '/demo',
        },
      },
      {
        path : '/upload',
        component : resolve => require(['@/views/upload'], resolve), 
        meta : {
          name : '/upload',
        },
      },
      {
        path : '/wow',
        component : resolve => require(['@/views/wow'], resolve), 
        meta : {
          name : '/wow',
        },
      },
      {
        path : '/i18',
        component : resolve => require(['@/views/i18'], resolve), 
        meta : {
          name : '/i18',
        },
      },
      {
        path : '/tinymce',
        component : resolve => require(['@/views/tinymce'], resolve), 
        meta : {
          name : '/tinymce',
        },
      },
      {
        path : '/highlight',
        component : resolve => require(['@/views/highlight'], resolve), 
        meta : {
          name : '/highlight',
        },
      },
      {
        path : '/pdfjs',
        component : resolve => require(['@/views/pdfjs'], resolve), 
        meta : {
          name : '/pdfjs',
        },
      },
    ],
  },
];

export default pages