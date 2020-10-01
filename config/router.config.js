export default [
  {
    path: '/',
    redirect: '/cmct/searchPage',
  },
  {
    path: '/cmct',
    redirect: '/cmct/searchPage',
  },
  {
    path: '/cmct',
    component: '../layouts',
    routes: [
      {
        path: 'searchPage',
        component: './home/searchPage',
      },
      {
        path: 'newGraph',
        component: './graph/newGraph',
      },
      {
        path: 'classGraph',
        component: './graph/classGraph',
      },
    ],
  },
]
