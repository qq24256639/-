/**
 * Created by alfred on 2018/10/21.
 */

import fetch from '@/utils/fetch'

export function getClasses(pageSize, current) {
  return fetch({
    url: `datacenter/v1/?r=data%2Fget-classes&pageSize=${pageSize}&current=${current}`,
    method: 'get',
  })
}
