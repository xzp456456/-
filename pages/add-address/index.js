// pages/add-address/index.js
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
import address from '../../extend/address/address.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker:[],
    address_id:null,
    addressInfo: {
      username: "",
      mobile: "",
      province: "",
      city: "",
      area: "",
      province_id: "",
      city_id: "",
      area_id: "",
      address: ""
    },
    addressId: "",
  },
  getAddressInfo() {
   console.log(address)
      
         

  },
  deleteText(e){
    console.log(e)
      let item = e.currentTarget.dataset.model;
      this.setData({
        [item]: ''
    })
  },
  selectRegion(e) {
    this.setData({
      picker: e.detail.value,
      "addressInfo.province": e.detail.value[0],
      "addressInfo.city": e.detail.value[1],
      "addressInfo.area": e.detail.value[2],
      "addressInfo.province_id": e.detail.code[0],
      "addressInfo.city_id": e.detail.code[1],
      "addressInfo.area_id": e.detail.code[2]
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.address_id){
      this.setData({
        address_id: options.address_id,
        is_default: app.addressInfo.is_default,
        picker: [app.addressInfo.province, app.addressInfo.city, app.addressInfo.area],
        region_select: null,
        username: app.addressInfo.username,
        mobile: app.addressInfo.mobile,
        address: app.addressInfo.address,
        addressInfo:{
          province: app.addressInfo.province,
          city: app.addressInfo.city,
          area: app.addressInfo.area,
          province_id: app.addressInfo.province_id,
          city_id: app.addressInfo.city_id,
          area_id: app.addressInfo.area_id
        }
      })
    }
    this.getAddressInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getInputText(e){
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getUserAddress(){
    wxRequest.postRequest(api.userAddress(),{
      username: this.data.username,
      mobile: this.data.mobile,
      province: this.data.addressInfo.province,
      city: this.data.addressInfo.city,
      area: this.data.addressInfo.area,
      address: this.data.address,
      province_id: this.data.addressInfo.province_id,
      city_id: this.data.addressInfo.city_id,
      area_id: this.data.addressInfo.area_id
    })
    .then(res=>{
      console.log(res)
      if(res.status == 1){
        wx.navigateTo({
          url: '/pages/address/index',
        })
      }else{
        wx.showToast({
          title: res.msg
        })
      }
    })
  },
  updateUserAddress() {
    wxRequest.postRequest(api.updateAddress(), {
      address_id: this.data.address_id,
      username: this.data.username,
      mobile: this.data.mobile,
      province: this.data.addressInfo.province,
      city: this.data.addressInfo.city,
      area: this.data.addressInfo.area,
      address: this.data.address,
      province_id: this.data.addressInfo.province_id,
      city_id: this.data.addressInfo.city_id,
      area_id: this.data.addressInfo.area_id
    })
      .then(res => {
        console.log(res)
        if (res.status == 1) {
          wx.navigateTo({
            url: '/pages/address/index',
          })
        } else {
          wx.showToast({
            title: res.msg
          })
        }
      })
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