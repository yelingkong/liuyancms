const sourceRouter = {
  route: null,
  name: null,
  title: '来源管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'views/source/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '新增来源',
      type: 'view',
      name: 'sourceAdd',
      route: '/source/add',
      filePath: 'views/source/SourceAdd.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '来源列表',
      type: 'view',
      name: 'sourceAdd',
      route: '/source/list',
      filePath: 'views/source/SourceList.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default sourceRouter
