/**
 * Created by alfred on 2018/10/17.
 */

const teacher = {
  state: {
    list: [],
    teacher: {},
    pagination: {
      total: 0,
      per_page: 10,
      page: 1,
      pages: 0
    }

  },

  mutations: {
    SET_TEACHERS: (state, data) => {
      state.list = data
    },
    SET_CURRENT_TEACHER: (state, index) => {
      state.teacher = state.list[index]
    },
    SET_TEACHER_PAGIN: (state, data) => {
      Object.assign(state.pagination, data)
    }
  }
}

export default teacher
