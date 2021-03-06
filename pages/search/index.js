// pages/search/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{}
  },
  getkeyWord(e){
    this.setData({
      keyword:e.detail.value
    })
  },
  hotSearch(e){
    let value = e.currentTarget.dataset.value
    this.setData({
      keyword:value
    })
    this.gotoList()
  },
  gotoList(){
    wx.navigateTo({
      url: '/pages/shop-list/index?keyword=' + this.data.keyword,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHot()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getHot(){
    wxRequest.postRequest(api.hotSearch(),{})
    .then((res)=>{
     // console.log(res)
      this.setData({
        list:res.data
      })
    })
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