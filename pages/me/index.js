// pages/me/index.js
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
    gotoOrder(e){
      let status = e.currentTarget.dataset.status
      wx.navigateTo({
        url: '/pages/orderList/index?status=' + status,
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  
  goToIndex(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  },
  goInBuss(e){
    if (e.currentTarget.dataset.status == -1){
    wx.navigateTo({
      url: '/pages/business/index',
    })
    }
    if(e.currentTarget.dataset.status == 0){
      wx.navigateTo({
        url: '/pages/Merchant/index',
      })
    }
  },
  goto(){
    wx.navigateTo({
      url: '/pages/coupon-detail/index',
    })
  },
  getUserInfo(){
    wxRequest.getRequest(api.getUserInfo(),{})
    .then(res=>{
      this.setData({
        userInfo:res.data
      })
      let text = res.data.cart_count.toString()
      wx.setTabBarBadge({
        index: 2,
        text: text
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
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('access_token')) {
      this.setData({
        isLogin: true
      })
    }
    this.getUserInfo()
  },
  loginOut(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认退出',
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('isAuthSuccess', false)
          wx.setStorageSync('access_token', '')
          wx.setStorageSync('bindOauthId', 0)
          that.setData({
            isLogin: false
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
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