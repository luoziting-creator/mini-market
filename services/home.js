import request from './network.js'

export function getSwiperData(){
  return request({
    url:'/home/swiperdata',
  })
}
export function getNavbarData(){
  return request({
    url:'/home/catitems',
  })
}
