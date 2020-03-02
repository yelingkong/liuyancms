const projectRouter = {
  route: null,
  name: null,
  title: '项目管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'views/project/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '新增项目',
      type: 'view',
      name: 'ProjectAdd',
      route: '/project/add',
      filePath: 'views/project/ProjectAdd.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '项目列表',
      type: 'view',
      name: 'ProjectList',
      route: '/project/list',
      filePath: 'views/project/ProjectList.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default projectRouter
