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
  gotoDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order-detail/index?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status:options.status
    })
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
  cancel(id){
    wxRequest.postRequest(api.cancelOrder(),{
      order_id:id
    })
    .then(res=>{
      if(res.status==1){
        this.getOrder()
      }
    })
  },
  orderconfirm(id) {
    wxRequest.postRequest(api.orderconfirm(), {
      order_id: id
    })
      .then(res => {
        if (res.status == 1) {
          this.getOrder()
        }
      })
  },
  readThing(e){
    var that = this
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定收货',
      success(res) {
        if (res.confirm) {

          that.orderconfirm(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  readCancel(e){
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
  deleteOrder(id) {
    wxRequest.postRequest(api.orderdelete(), {
      order_id: id
    })
      .then(res => {
        if (res.status == 1) {
          this.getOrder()
        }
      })
  },
  readDelete(e){
    var that = this
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定取消',
      success(res) {
        if (res.confirm) {

          that.deleteOrder(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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