/**
 * Created by alfred on 2018/10/15.
 */

import fetch from '@/utils/fetch'

export function getStudents(params) {

  return fetch({
    url: 'datacenter/v1/?r=data%2Fget-students',
    method: 'get',
    params: Object.assign({
      pageSize: 10,
      current: 1,
      // 学院
      instituteName: '',
      instituteId: '',
      // 专业
      professionName: '',
      professionId: '',
      // 班级
      className: '',
      classId: '',
      // 入学年份
      enrollYear: '',
      // 姓名
      studentName: '',
      // StudentStatus
      studentStatus: ''
    }, params)
  })
}

export function getStudentByID(id) {
  return fetch({
    url: `datacenter/v1/?r=data%2Fget-students&sid=${id}`,
    method: 'get'
  })
}

export function getProfessionalScores(pid, sid) {
  return fetch({
    url: `datacenter/v1/?r=data%2Fget-profession-scores&pid=${pid}&sid=${sid}`,
    method: 'get'
  })
}

export function getStudentScores(id) {
  return fetch({
    url: `datacenter/v1/?r=data%2Fget-student-scores&sid=${id}`,
    method: 'get'
  })
}

export function getStudentBaths(id) {
  return fetch({
    url: `datacenter/v1/?r=data%2Fget-student-baths&sid=${id}`,
    method: 'get'
  })
}

export function getStudentConsumes(id) {
  return fetch({
    url: `datacenter/v1/?r=data%2Fget-student-consumes&sid=${id}`,
    method: 'get'
  })
}

export function getStudentDinnings(id) {
  return fetch({
    url: `datacenter/v1/?r=data%2Fget-student-dinnings&sid=${id}`,
    method: 'get'
  })
}

export function getColledgeConsumes() {
  return fetch({
    url: 'datacenter/v1/?r=data%2Fget-colledge-consumes',
    method: 'get'
  })
}

export function getStudentPhoto(id) {
  return fetch({
    url: `datacenter/v1/?r=data%2Fget-student-photo&sid=${id}`,
    method: 'get'
  })
}

export function getColledgeAverageDinnings() {
  return fetch({
    url: 'datacenter/v1/?r=data%2Fget-colledge-average-consumes',
    method: 'get'
  })
}
