import request from './network.js'

export function getGoodsList() {
  return request({
    url: '/goods/search',
  
  })
}