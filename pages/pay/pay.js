//1. 页面加载的时候
    // 1.从缓存中获取购物车数据，渲染到页面.这些数据必须checked为true

// 2.微信支付
// 哪些账号可以实现微信支付
    // 2.1 企业账号
    // 2.2 企业账号的小程序中必须给开发者添加白名单
    // 2.3 一个appid可以同时绑定多个开发者
    // 2.4 这些开发者就可以公用这个appid和他的开发权限

// 3.点击支付按钮的时候  
  // 3.1 先判断有没有token
  // 3.2 没有跳转到授权页面，进行获取token
  // 3.3 有token 正常进行剩下的逻辑


Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0


  },
  onShow() {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart') || [];
    // 过滤后的购物车数组
    cart =cart.filter(v=>v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice = v.num * v.goods_price
        totalNum += v.num
    })
   
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
    wx.setStorageSync('cart', cart)
    
  },
  // 点击支付的功能
  handleOrderPay(){
    // 1.判断缓存中有没有token
    const token =wx.getStorageSync('token')
    // 2.判断
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
      return
    }
    console.log("已经存在token");

  }
})