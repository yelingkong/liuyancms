const frameworkRouter = {
  route: null,
  name: null,
  title: '框架管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'views/framework/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '新增框架',
      type: 'view',
      name: 'FrameworkAdd',
      route: '/framework/add',
      filePath: 'views/framework/FrameworkAdd.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '框架列表',
      type: 'view',
      name: 'FrameworkAdd',
      route: '/framework/list',
      filePath: 'views/framework/FrameworkList.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default frameworkRouter
