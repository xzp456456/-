// pages/address/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goinAdd(){
    wx.navigateTo({
      url: '/pages/add-address/index',
    })
  },
  getList(){
    wxRequest.getRequest(api.userAddress(),{}).then(res=>{
      console.log(res)
      this.setData({
        list:res.data.list
      })
    })
  },
  putData(e){
    app.addressInfo = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/add-address/index?address_id=' + e.currentTarget.dataset.id
    })
  },
  readyDelete(e){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认删除该地址',
      success(res) {
        if (res.confirm) {
          that.deleteAddress(e)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  deleteAddress(e){
    let address_id = e.currentTarget.dataset.id;
    wxRequest.postRequest(api.addressDelete(),{
      address_id
    })
    .then(res=>{
      if(res.status == 1){
      this.getList()
        wx.showToast({
          title: '删除成功'
        })
      }else{
        wx.showToast({
          title: res.msg
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
    this.getList()
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
  changAddress(e){
    let id = e.currentTarget.dataset.id
    wxRequest.postRequest(api.userAddressdefault(),{
      address_id:id
    }).then(res=>{
      console.log(res)
      this.getList()
    })
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