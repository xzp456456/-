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
    time:{},
    updateTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  goToPay(){
    let id = this.data.id
    wx.navigateTo({
      url: '/pages/orderTime/index?order_id=' + id,
    })
  },
  cancel(id) {
    wxRequest.postRequest(api.cancelOrder(), {
      order_id: id
    })
      .then(res => {
        if (res.status == 1) {
          this.getOrderInfo()
        }
      })
  },
  readCancel(e) {
    var that = this
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定取消',
      success(res) {
        if (res.confirm) {

          that.cancel(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getOrderInfo(){
    let id = this.data.id
    wxRequest.getRequest(api.getorder() + '/'+id,{})
    .then(res=>{
      console.log(res)
      app.payInfo = res.data
      this.setData({
        info:res.data
      })
      let oldTime = res.data.remain_time
      this.setData({
        start_timer: setInterval(() => {
          oldTime--

          this.setData({
            updateTime: oldTime
          })
        }, 1000)
      })
    })
  },
  serve(e){
    let order_id = e.currentTarget.dataset.order_id
    let order_goods_id = e.currentTarget.dataset.order_goods_id
    wx.navigateTo({
      url: '/pages/server/index?order_id='  +order_id + '&&order_goods_id=' + order_goods_id
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.start_timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.start_timer);
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