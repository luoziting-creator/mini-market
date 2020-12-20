import request from './network.js'

export function categoryData(){
  return request ({
    url:'/categories'

  })
}