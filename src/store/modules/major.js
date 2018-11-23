/**
 * Created by alfred on 2018/10/17.
 */

const major = {
  state: {
    list: [],
    major: {},
    pagination: {
      total: 0,
      per_page: 10,
      page: 1,
      pages: 0
    }

  },

  mutations: {
    SET_MAJORS: (state, data) => {
      //过滤非法数据
      state.list = data
    },
    SET_CURRENT_MAJOR: (state, index) => {
      state.major = state.list[index]
    },
    SET_MAJOR_PAGIN: (state, data) => {
      Object.assign(state.pagination, data)
    }
  }
}

export default major
