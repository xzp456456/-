//index.js
//获取应用实例
const app = getApp()
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    list:[],
    seckill:[],
    banner:[],
    category:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goIndexDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/index?goods_id=' + id
    })
  },
  getAddress(){
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
      }
    })
  },
  onShow(){
    this.getBanner()
    this.getGood()
  },
  getBanner(){
    wxRequest.getRequest(api.advert(), { code:'ad-index'})
    .then(res=>{
      this.setData({
      background:res.data.list
      })
    })
  },
  getCategory(){
    wxRequest.getRequest(api.category(),{
      level:1
    })
    .then(res=>{
      
      this.setData({
        category:res.data.list
      })
    })
  },
  getMore(){
    wx.navigateTo({
      url: '/pages/seckill/index',
    })
  },
  goto() {
    wx.navigateTo({
      url: '/pages/coupon-center/index',
    })
  },
  goinList(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shop-list/index?p_category_id='+id,
    })
  },
  onLoad: function () {
    this.getCategory()
    this.groupon()
    this.getList()
  },
  search(){
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },
  groupon(){
    wxRequest.getRequest(api.groupon(),{})
    .then(res=>{
      console.log(res)
      this.setData({
        list: res.data.list
      })
    })
  },
  getList() {
    wxRequest.getRequest(api.seckill(), { time_id: 4 })
      .then(res => {

        this.setData({
          seckill: res.data.list
        })
      })
  },
  getGood(){
    wxRequest.getRequest(api.goodsList(),{
      sales:1
    })
    .then(res=>{
      this.setData({
        goodList:res.data.list
      })
    })
  }
})
