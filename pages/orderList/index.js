// pages/orderList/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getPay(e){
    wx.navigateTo({
      url: '/pages/orderTime/index?order_id='+ e.currentTarget.dataset.id,
    })
  },
  changStatus(e){
    let status = e.currentTarget.dataset.status
    this.setData({
      status: status
    })
    this.getOrder()
  },
  getOrder(){
    let status = this.data.status
    wxRequest.getRequest(api.myOrder(),{
      status: status
    })
    .then(res=>{
      this.setData({
        list:res.data.list
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
    this.getOrder()
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