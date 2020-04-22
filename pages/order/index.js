// pages/order/index.js
const app = getApp();
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index:0,
    goods_id:'',
    detail:'',
    message:''
  },
  getmessage(e){
    this.setData({
      message: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      goods_id: options.goods_id
    })
  },
  goToAddress(){
    wx.navigateTo({
      url: '/pages/address/index',
    })
  },
  goToYh(){
    wx.navigateTo({
      url: '/pages/coupon/index?goods_id='+this.data.goods_id,
    })
  },
  fastSettlement(){
    wxRequest.getRequest(api.fastSettlement(),{
      goods_id: this.data.goods_id
    })
    .then(res=>{
      console.log(res)
      app.payInfo = res.data
      this.setData({
        detail:res.data
      })
    })
  },
  getdeliverTime(){
    wxRequest.postRequest(api.deliverTime(),{})
    .then(res=>{
        console.log(res)
        this.setData({
          array:res.data.value
        })
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  getPay(){
    wxRequest.postRequest(api.getorder(),{
      address_id: this.data.detail.address.id,
      goods_id: this.data.detail.goods[0].goods_id,
      buy_num: parseFloat(this.data.detail.real_money),
      pay_way:'wxpay',
      order_info:JSON.stringify({
        message:this.data.message,
        user_coupon_id:'',
        expected_delivery_day_time:1587052800,
        expected_delivery_time:'20:00-20:30',
        reduction_money: ''
      }),
      activity_goods_id:'',
      sku_id:''
    }).then(res=>{
      if(res.status==1){
        wx.navigateTo({
          url: '/pages/orderTime/index?order_id='+res.data.order_id,
        })
      }
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
    this.getdeliverTime()
    this.fastSettlement()
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