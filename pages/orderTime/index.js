// pages/orderTime/index.js
const app = getApp();
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    cart_ids:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        order_id: options.order_id
      })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getPayInfo(){
    let id = this.data.order_id
    wxRequest.getRequest(api.myOrder() +'/' +id,{})
    .then(res=>{
      this.setData({
        info:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    this.getPayInfo()
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