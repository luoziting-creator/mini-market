// pages/goods_list/goods_list.js
import {getGoodsList} from '../../services/goodslist.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles:['综合','销量','价格'],
    goodsList:[]
   
  },
   // 接口要的参数
   QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPage:0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid=options.cid
    // console.log(this.QueryParams.cid);
    // 获取商品列表的数据
    this._getGoodsList()

  },
  _getGoodsList(){
    getGoodsList().then(res=>{
      // console.log(res);
      const result = res.data.message
      console.log(result);
      // 1.获取总条数
      const total =result.total
      // 2.计算总页数
      this.totalPage =Math.ceil(total/this.QueryParams.pagesize)
      console.log(this.totalPage);

      this.setData({
        // 拼接的数组
        goodsList:[...this.data.goodsList,...result.goods]
      })
    })
     // 关闭下拉刷新的窗口,如果没有调用下拉刷新的窗口，直接关闭也不会报错
     wx.stopPullDownRefresh();
  },

  // 用户上划页面划定触底开始加载页面数据
  // 1.找到滚动条触底事件，onReachBottom
  // 2.判断有没有下一页数据
  // 2.1获取到总页数 只有总条数   总页数 = Math.ceil(总条数 /页容量)
  // 2.2获取到当前的页码  pagenum
  // 2.3 判断一下当前的页码是否大于等于总页数  表示没有下一页数据
  // 3.假设没有下一页数据弹出一个提示
  // 假设还有下一页数据来加载下一页数据
  //当前的页码数++
  // 数据请求回来要对data中的数组进行拼接，而不是全部替换
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('onReachBottom');
    // 判断还有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPage ){
      // 表示没有下一页数据了
      wx.showToast({
        title: '没有下一页数据',
      })
    }else{
       // 有下一页数据了
      this.QueryParams.pagenum++;
      this._getGoodsList()
      
    }
  
  },

 /** 
  * 
  * 下拉刷新页面
  * 1.触发下拉刷新事件   需要在页面的json文件中开启一个配置项 enablePullDownRefresh
  * 2..重置数据数组
  * 3.重置页码设置为1
  * 4.重新发送请求
  * 5.数据请求回来了要关闭等待效果
  *  /**
 /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log('onPullDownRefresh');
    // 1.重置数据数组
    this.setData({
      goodsList:[]
    })
    // 2.重置页码设置为1
    this.QueryParams.pagenum=1
    // 3.重新发送请求
    this._getGoodsList()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})