// pages/help-detail/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
import WxParse from '../../extend/wxParse/wxParse.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getDetail(options.normal_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getDetail(id){
    var that = this;
    wxRequest.getRequest(api.questionDetail()+id, {})
      .then((res) => {
        console.log(res)
        this.setData({
          title: res.data.question_title
        })
        var article = res.data.question_content;
        WxParse.wxParse('article', 'html', article, that, 5);
      })
    
  },
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