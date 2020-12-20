 import {
   baseURL
 } from './config.js'
 // 异步请求数据的次数
 let ajaxTime = 0
 export default function (options) {
   ajaxTime++
   //  显示加载中的效果
   wx.showLoading({
     title: '加载中',
     mask: true
   })
   return new Promise((resolve, reject) => {
     wx.request({
       url: baseURL + options.url,
       method: options.method || 'get',
       data: options.data || {},
       success: resolve,
       fail: reject,
       complete: () => {
         ajaxTime--
         if (ajaxTime === 0) {
           // 关闭加载的图标
           wx.hideLoading()
         }
       }
     })
   })
 }