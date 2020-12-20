// pages/category/category.js
import {
  categoryData
} from '../../services/category.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的商品数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 接口的返回数据
    cates: [],
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop:0,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 0. web中的本地存储和小程序中的本地存储的区别
    // ①  写代码的方式不一样了
    // web: localStorage.setItem("key","value")  localStorage.getItem("key")
    // 小程序中 ：wx.setStorageSync("key","value")  wx.getStorageSync("key")

    // ② 存的时候有没有类型转换
    // web: 不管存入什么类型的数据，最终都会调用下toString(),把数据编程字符串在存入进去
    // 小程序：不存在类型转换的这个操作，存什么类型的数据进去，获取的就是什么类型 
    // 请求的数据太多可以考虑使用缓存技术
    // 1.先判断一下本地存储中有没有旧的数据  {time:Date.now(),data:[...]}
    // 2.没有旧的数据直接发送请求
    // 3.有旧的数据，旧的数据没有过期就是用本地存储中的旧的数据就好


    // 获取本地存储的数据
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this._categoryData()
    } else {
      // 有旧的数据定义过期时间 10s 改成10分钟
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this._categoryData()

      } else {
        // console.log('可以使用旧的数据');
        this.cates=Cates.data;
        // 1.获取左侧的商品数据
        let leftMenuList = this.cates.map(v => v.cat_name)
        // 2.获取右侧的商品数据
        let rightContent = this.cates[0].children
        this.setData({
          leftMenuList,
          rightContent

        })
      }

    }


  },
  _categoryData() {
    categoryData().then(res => {
      // console.log(res);
      this.cates = res.data.message
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: this.cates
      });

      // 1.获取左侧的商品数据
      let leftMenuList = this.cates.map(v => v.cat_name)
      // 2.获取右侧的商品数据
      let rightContent = this.cates[0].children
      this.setData({
        leftMenuList,
        rightContent

      })
      

    })


  },
  menuclick(e) {
    // console.log(e);
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex

    // 2.请求对应currentIndex的数据
    let rightContent = this.cates[currentIndex].children
    // 根据不同的索引渲染不同的内容
    this.setData({
      currentIndex,
      rightContent,
      // 重新设置右侧内容的的scroll-view标签距离顶部的距离
      scrollTop:0

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