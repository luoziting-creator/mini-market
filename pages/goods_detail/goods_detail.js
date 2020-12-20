// pages/goods_detail/goods_detail.js

import {
  goodsDetailInfo
} from '../../services/detail.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}

  },
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log(options);
    const {
      goods_id
    } = options;
    // console.log(goods_id);
    // 请求商品详情数据
    this._goodsDetailInfo(goods_id)


  },
  _goodsDetailInfo(goods_id) {
    goodsDetailInfo(goods_id).then(res => {
      console.log(res);
      const goodsObj = res.data.message;
      this.GoodsInfo = goodsObj;
      this.setData({
        goodsObj: {
          goods_name: goodsObj.goods_name,
          goods_price: goodsObj.goods_price,
          // iphone部分手机是不识别webp图片格式，
          // 1.最好找后台让他进行修改
          // 2.自己修改，确保后台存在 1.webp =>  1.jpg
          goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: goodsObj.pics,
        }
      })
    })
  },
  // 点击轮播图放大预览
  // 1. 给轮播图绑定事件
  // 2.调用小程序中的api previewImage
  // 3. 点击加入购物车

  handlePreviewImage(e) {
    // console.log('handlePreviewImage');
    // 先构造要预览的图片数组
    const pics = this.GoodsInfo.pics.map(v => v.pics_mid)
    // 2接受传递过来的url
    console.log(e);
    const current = e.currentTarget.dataset.url

    wx.previewImage({
      current, // 当前显示图片的http链接
      urls: pics // 需要预览的图片http链接列表
    })

  },
  //  3.1.先绑定事件
  // 3.2.  获取缓存中的购物车数据数组格式
  // 3.3  先判断当前的商品是否存在与购物车
  // 3.4  已经存在修改的商品的数据，执行购物车数量++ 重新把购物车数组数组填充到缓存中
  // 3.5 不存在购物车的数组中，直接给购物车数组添加一个新元素，新元素带上购买数量 num ,重新把购物车数组填充到缓存中
  // 3.6 弹出提示
  handleAddCar() {
    // console.log('1111');
    // 1.获取缓存中的购物车数据数组格式
    const cart =wx.getStorageSync('cart') || []
    // 2.先判断当前的商品是否存在与购物车
    const index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index=== -1) {
      // 3.不存在，第一次添加
      this.GoodsInfo.num=1
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo)
    }else {
      // 4.存在数量++
      cart[index].num++
    }
    // 5.把购物车数组填充到缓存中
    wx.setStorageSync('cart',cart )
    // 6.并给出弹窗
    wx.showToast({
      title: '加入购物车成功',
      icon:'success',
      // 防止用户手抖 疯狂点击按钮
      mask:true
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