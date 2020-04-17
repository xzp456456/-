// pages/order-detail/index.js
const app = getApp();
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    time:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  goToPay(){
    let id = app.cart_ids.join(',')
    wx.navigateTo({
      url: '/pages/orderTime/index?cart_ids=' + id,
    })
  },
  getTime(){
    wxRequest.getRequest(api.deliverTime(),{})
    .then(res=>{
      time: res.data.value
    })
  },
  getOrderInfo(){
    let cart_ids = app.cart_ids.join(',')
    let activity_money = app.activity_money
    wxRequest.getRequest(api.settlement(),{
      cart_ids,
      activity_money
    })
    .then(res=>{
      console.log(res)
      app.payInfo = res.data
      this.setData({
        info:res.data
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
    this.getOrderInfo()
    this.getTime()
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