/**
 * Created by alfred on 2018/10/20.
 */
import fetch from '@/utils/fetch'

//获取学校生源地
export function getColledgeEnrollments() {
  return fetch({
    url: 'datacenter/v1/?r=data%2Fget-colledge-enrollments',
    method: 'get'
  })
}

//获取院系
export function getInstitutes(params) {
  return fetch({
    url: 'datacenter/v1/?r=data%2Fget-institutes-enrollments',
    method: 'get',
    params: Object.assign({
      pageSize: 10,
      current: 1
    }, params)
  })
}
