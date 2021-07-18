

import Layout from '@/layout/index.vue'

const ExampleRouter = [
    {
        path: '/example',
        component: Layout,
        redirect: '/example/list',
        meta: {
          title: 'example',
          icon: '#iconexample'
        },
        children: [
            {
                path: 'create',
                component: () => import(/* webpackChunkName: "example-create" */ '@/views/example/Create.vue'),
                name: 'CreateArticle',
                meta: {
                  title: 'createArticle',
                  icon: 'edit',
                  roles: ['admin'],
                  alwaysShow: true // will always show the root menu
                }
              },
              {
                path: 'edit/:id(\\d+)',
                component: () => import(/* webpackChunkName: "example-edit" */ '@/views/example/Edit.vue'),
                name: 'EditArticle',
                meta: {
                  title: 'editArticle',
                  noCache: true,
                  roles: ['admin', 'editor'],
                  activeMenu: '/example/list',
                  hidden: true
                }
              },
              {
                path: 'list',
                component: () => import(/* webpackChunkName: "example-list" */ '@/views/example/List.vue'),
                name: 'ArticleList',
                meta: {
                  title: 'articleList',
                  icon: 'list'
                }
              }
            ]
      }
]

export default ExampleRouter