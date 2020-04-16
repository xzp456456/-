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
    banner:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow(){
    this.getBanner()
  },
  getBanner(){
    wxRequest.getRequest(api.advert(), { code:'ad-index'})
    .then(res=>{
      this.setData({
      background:res.data.list
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
  goinList(){
    wx.navigateTo({
      url: '/pages/shop-list/index',
    })
  },
  onLoad: function () {
   
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
  }
 
})
