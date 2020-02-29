/* eslint-disable class-methods-use-this */
import { post, get, put, _delete } from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Source {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async addSource(info) {
    const res = await post('v1/source', info, { handleError: true })
    return res
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getSource(id) {
    const res = await get(`v1/source/${id}`)
    return res
  }

  async editSource(id, info) {
    const res = await put(`v1/source/${id}`, info)
    return res
  }

  async delectSource(id) {
    const res = await _delete(`v1/source/${id}`)
    return res
  }

  async getSourcies() {
    const res = await get('v1/source', { handleError: true })
    return res
  }
}

export default new Source()
