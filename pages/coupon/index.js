// pages/coupon/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexSelect:'',
    goods_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id: options.goods_id
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
    this.getCoupon()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  selectList(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      indexSelect: index,
      coupon_id: e.currentTarget.dataset.coupon_id
    })
  },
  getCoupon(){
    wxRequest.getRequest(api.getcoupon(),{})
    .then(res=>{
      this.setData({
        list:res.data.list
      })
    })
  },
  useCart(){
    wx.navigateTo({
      url: '/pages/order/index?coupon_id=' + this.data.coupon_id + '&&goods_id=' + this.data.goods_id
    })
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