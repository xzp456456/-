// pages/server/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
import config from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    detail:'',
    urlImg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id,
      order_goods_id: options.order_goods_id
    })
  },
  orderGoods(){
    wxRequest.getRequest(api.orderGoods(),{
      order_id: this.data.order_id,
      order_goods_id:this.data.order_goods_id
    })
    .then(res=>{
      this.setData({
        info:res.data
      })
    })
  },
  getInputText(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    });
  },
  uploadPic() {
    var that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          header: {
            'access-token': wx.getStorageSync('access_token')
          },
          url: config + '/api/upload',
          filePath: tempFilePaths[0],
          name: 'files[]',
          formData: {
            'is_only_url': 1
          },
          success(res) {
            console.log(res)
            let obj = JSON.parse(res.data)
            console.log(obj)
            let arr = that.data.urlImg
            arr.push(obj.data.url)
            that.setData({
              urlImg: arr
            })
          }
        })
      }
    })
  },
  getText(e){
    this.setData({
      detail: e.detail.value
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
    this.orderGoods()
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