/**
 * Created by alfred on 2018/10/15.
 */
import fetch from '@/utils/fetch'

export function getTeachers(pageSize, current) {
  return fetch({
    url: `/datacenter/v1/?r=data%2Fget-teachers&pageSize=${pageSize}&current=${current}`,
    method: 'get'
  })
}
