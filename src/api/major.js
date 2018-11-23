/**
 * Created by alfred on 2018/10/15.
 */
import fetch from '@/utils/fetch'

export function getMajors(pageSize, current) {
  return fetch({
    url: `/datacenter/v1/?r=data%2Fget-majors&pageSize=${pageSize}&current=${current}`,
    method: 'get'
  })
}
