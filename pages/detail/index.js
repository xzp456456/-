// pages/detail/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    onOff:true,
    hidden:true,
    countPay:1,
    info:{
      images:[]
    },
    goods_id:''
  },
  payOrder(){
    wx.navigateTo({
      url: '/pages/order/index?goods_id='+ this.data.goods_id,
    })
  },
  add(){
    let count = this.data.countPay + 1
    this.setData({
      countPay: count
    })
  },
    put(){
      let count = this.data.countPay - 1
      if (count === 0){
        return
      }
      this.setData({
        countPay: count
      })
    },
  actionSheetTap(){
    this.setData({ onOff: false });
  },

  btnclick: function () {
    this.setData({ onOff: true });
  },
  actionSheetShow() {
    this.setData({ hidden: false });
  },

  btnclickHide: function () {
    this.setData({ hidden: true });
  },
  getDetail(id){
    wxRequest.getRequest(api.goodsList()+ '/' + id, {})
    .then(res=>{
      console.log(res)
      this.setData({
        info:res.data,
        count: res.data.cart_count
      })
    })
  },
  favorite(){
    if (this.data.info.favorite_id === 0){
      this.favoriteAdd()
    }else{
      this.favoriteDelete()
    }
  },
  favoriteAdd(){
    wxRequest.postRequest(api.favorite(),{
      favoriteable_id: this.data.goods_id,
      favoriteable_type:'goods'
    })
    .then(res=>{
      if(res.status){
        console.log(res)
        this.getDetail(this.data.goods_id)
      }
    })
  },
  favoriteDelete(){
    wxRequest.postRequest(api.favoriteDelete(), {
      favorite_ids: this.data.info.favorite_id
    })
      .then(res => {
        if (res.status) {
          console.log(res)
          this.getDetail(this.data.goods_id)
        }
      })
  },
  joinCart(){
    wxRequest.postRequest(api.cart(),{
      goods_id: parseInt(this.data.goods_id),
      buy_num:1
    })
    .then(res=>{
      if(res.status == 1){
        this.setData({
          count: res.data.count
        })
      }else{
        wx.showToast({
          icon:'none',
          title: res.msg
        })
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id: options.goods_id
    })
    this.getDetail(options.goods_id)
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