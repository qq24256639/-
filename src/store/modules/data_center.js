/**
 * Created by alfred on 2018/9/17.
 * 数据中心
 */

const dataCenter = {
  state: {
    dataSources:[
      {
        id: 'information_center_duties',
        type: 'mssql', // rds, ads
        host: '192.168.5.211',
        user: 'kaoqin',
        password: 'kq2017!QAZ',
        database: '',
        port: 1433,
        created: 1537188047,
        updated: 1537188047,
        name: '医专教务数据库',
        status: '正常'
      },
      {
        id: 'information_center_duties',
        type: 'mysql', // rds, ads
        host: '192.168.5.211',
        user: 'kaoqin',
        password: 'kq2017!QAZ',
        database: '',
        port: 1433,
        created: 1537188047,
        updated: 1537188047,
        name: '医专教务数据库',
        status: '异常'
      },
      {
        id: 'information_center_duties',
        type: 'mssql', // rds, ads
        host: '192.168.5.211',
        user: 'kaoqin',
        password: 'kq2017!QAZ',
        database: '',
        port: 1433,
        created: 1537188047,
        updated: 1537188047,
        name: '医专教务数据库',
        status: '正常'
      },
      {
        id: 'information_center_duties',
        type: 'mssql', // rds, ads
        host: '192.168.5.211',
        user: 'kaoqin',
        password: 'kq2017!QAZ',
        database: '',
        port: 1433,
        created: 1537188047,
        updated: 1537188047,
        name: '医专教务数据库',
        status: '正常'
      },
      {
        id: 'information_center_duties',
        type: 'mssql', // rds, ads
        host: '192.168.5.211',
        user: 'kaoqin',
        password: 'kq2017!QAZ',
        database: '',
        port: 1433,
        created: 1537188047,
        updated: 1537188047,
        name: '医专教务数据库',
        status: '正常'
      },
      {
        id: 'information_center_duties',
        type: 'mssql', // rds, ads
        host: '192.168.5.211',
        user: 'kaoqin',
        password: 'kq2017!QAZ',
        database: '',
        port: 1433,
        created: 1537188047,
        updated: 1537188047,
        name: '医专教务数据库',
        status: '正常'
      },
      {
        id: 'information_center_duties',
        type: 'mssql', // rds, ads
        host: '192.168.5.211',
        user: 'kaoqin',
        password: 'kq2017!QAZ',
        database: '',
        port: 1433,
        created: 1537188047,
        updated: 1537188047,
        name: '医专教务数据库',
        status: '正常'
      },
      {
        id: 'information_center_duties',
        type: 'mssql', // rds, ads
        host: '192.168.5.211',
        user: 'kaoqin',
        password: 'kq2017!QAZ',
        database: '',
        port: 1433,
        created: 1537188047,
        updated: 1537188047,
        name: '医专教务数据库',
        status: '正常'
      }
    ]
  },
  mutations: {
    SET_DATASOURCES: (state, dataSources) => {
      state.dataSources = dataSources
    },
    SET_DATASOURCE: (state, dataSource) => {
      state.dataSource = dataSource
    }
  },
  actions: {
    getDataSources: ({commit}, data) => {
      commit('SET_DATASOURCES', data)
    },
    updateDataSource: ({commit}, data) => {
      // todo id为空的话则新增
      commit('SET_DATASOURCE', data)
    },

  }
}

export default dataCenter
