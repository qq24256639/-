/**
 * Created by alfred on 2018/10/17.
 */

const student = {
  state: {
    list: [],
    student: {},
    scores: {},
    profession_scores: {},
    pagination: {
      total: 0,
      per_page: 10,
      page: 1,
      pages: 0
    }

  },

  mutations: {
    SET_STUDENTS: (state, data) => {
      state.list = data
    },
    SET_CURRENT_STUDENT: (state, data) => {
      state.student = data
    },
    SET_STUDENT_PAGIN: (state, data) => {
      Object.assign(state.pagination, data)
    },
    SET_SCORES: (state, data) => {
      state.scores = data
    },
    SER_PROFESSIONAL_SCORES: (state, data) => {
      state.profession_scores = data
    }
  }
}

export default student
