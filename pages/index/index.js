//index.js
//获取应用实例
const app = getApp()
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({
  data: {
    local:'定位中..',
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
  onShow() {
    this.getBanner()
    this.getGood()
    this.getAddressName()
    this.getLocation()
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
  /*定位*/
  getLocation() {
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        let latitude, longitude;
        latitude = res.latitude.toString();
        longitude = res.longitude.toString();
        wx.request({
          url: "https://apis.map.qq.com/ws/geocoder/v1/",
          data: {
            location: `${latitude},${longitude}`,
            key: "PKXBZ-UARKP-SDJDO-LLSYK-FYRAE-FOBXS",
            get_poi: 0
          },
          success: (re) => {
            if (re.statusCode === 200) {
              if (re.data.result) {
                let { ad_info } = re.data.result;
                this.setData({
                  local: ad_info.district
                });
              } else {
                showToast(re.data.message);
              }
            } else {
              showToast("获取信息失败，请重试！");
            }
          }
        });
      },
      fail: () => { }
    });
  },
  /*获取权限*/
  getSetting() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userLocation"] == false) {
          showModal(
            "检测到您未授权使用位置权限，请先开启",
            (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    this.getLocation();
                  }
                });
              } else {
                showToast("拒绝授权");
                this.setData({
                  local: "定位失败"
                });
              }
            }
          );
        } else {
          wx.authorize({
            scope: "scope.userLocation",
            success: () => {
              this.getLocation();
            },
            fail: () => {
              showToast("拒绝授权");
              this.setData({
                local: "定位失败"
              });
            }
          })
        }
      },
      fail: () => { }
    })
  },
 
  getBanner(){
    wxRequest.getRequest(api.advert(), { code:'ad-index'})
    .then(res=>{
      this.setData({
      background:res.data.list
      })
    })
  },
  getAddressName(){
  wx.getSetting({
    success: (res)=>{
      wx.getLocation({
        type: 'wgs84',
        success(res) {
         console.log(res)
        }
      })
    }
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
