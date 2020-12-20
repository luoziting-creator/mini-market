import {getSwiperData,getNavbarData,getFloorData } from '../../services/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    navbarInfo:[],
    floorInfo:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图数据
    this._getSwiperData()
    // 获取nabvbar的数据
    this._getNavbarData()
    // 获取楼层数据
    this._getFloorData()

    
  },
// 获取轮播图数据
_getSwiperData(){
  getSwiperData().then(res=>{
    // console.log(res)
    // 1.  获取轮播图数据
    const banners =res.data.message
    // console.log(banners)
    this.setData({
      banners,
      
    })
  })

},
// 获取Navbar数据
_getNavbarData(){
  getNavbarData().then(res=>{
    console.log(res);
    const navbarInfo=res.data.message
    this.setData({
      navbarInfo
    })
  })
},
// 获取楼层数据
_getFloorData(){
  getFloorData().then(res=>{
    console.log(res);
    const floorInfo =res.data.message
    this.setData({
      floorInfo
    })
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})