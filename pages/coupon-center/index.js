// pages/coupon/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getCoupon(e){
    let coupon_id = e.currentTarget.dataset.id
    console.log(e)
    wxRequest.postRequest(api.getcoupon(), { coupon_id })
    .then(res=>{
        if(res.status == 1){
          wx.showToast({
            title: res.msg,
          })
          this.getList()
        }
    })
  },
  getList(){
    wxRequest.getRequest(api.getCouponsByUid(),{})
    .then(res=>{
      console.log(res)
      this.setData({
        list:res.data.data
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