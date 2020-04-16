// pages/shop-list/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    count:'',
    keyword:'',
    order_price:1,
    sales:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  searchText(e){
    console.log(e)
    this.setData({
      keyword: e.detail.value
    })

  },
  goIndexDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/index?goods_id='+id
    })
  },
  searchAll(){
    this.setData({
      order_price: 1,
      sales: 1
    })
    this.getList()
  },
  searchNum(){
    this.data.order_price == 1 ? this.data.order_price = 2 : this.data.order_price = 1
    this.getList()
  },
  searchPrice(){
    this.data.sales == 1 ? this.data.sales = 2 : this.data.sales = 1
    this.getList()
  },
  onLoad: function (options) {
    this.getList()
  },
  getList(){
    wxRequest.getRequest(api.goodsList(),{
       order_price: this.data.order_price,
       sales: this.data.sales,
       keyword: this.data.keyword
    })
    .then(res=>{
      console.log(res)
    this.setData({
      list:res.data.list,
      count: res.data.count
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