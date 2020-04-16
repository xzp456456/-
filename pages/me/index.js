0// pages/me/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isAuthSuccess:null,
    isLogin:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    if (wx.getStorageSync('access_token')){
      this.setData({
        isLogin:true
      })
    }
  },
  goToIndex(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  },
  goto(){
    wx.navigateTo({
      url: '/pages/coupon/index',
    })
  },
  getUserInfo(){
    wxRequest.getRequest(api.getUserInfo(),{})
    .then(res=>{
      this.setData({
        userInfo:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  login(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  onReady: function () {

  },
  agentMsg(){
    wxRequest.postRequest(api.agentMsg(), {})
    .then(res=>{
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.agentMsg()
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