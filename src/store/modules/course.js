/**
 * Created by alfred on 2018/10/17.
 */

const course = {
  state: {
    list: [],
    course: {},
    pagination: {
      total: 0,
      per_page: 10,
      page: 1,
      pages: 0
    }

  },

  mutations: {
    SET_COURSES: (state, data) => {
      state.list = data
    },
    SET_CURRENT_COURSE: (state, index) => {
      state.course = state.list[index]
    },
    SET_COURSE_PAGIN: (state, data) => {
      Object.assign(state.pagination, data)
    }
  }
}

export default course
