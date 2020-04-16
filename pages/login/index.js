// pagesUser/login/login.js

const app = getApp();
const { showLoading, showToast, showModal } = require("../../utils/util.js");
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindOauthId: "",
    promo_code: "",
    authWechatInfo: false,
    authWechatPhone: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.promo_code){
      this.setData({
        promo_code: options.promo_code
      });
    }
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
    this.onLaunch();
    this.checkSession();
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

  },
  //
  checkSession() {
    wx.checkSession({
      success() {},
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        this.setData({
          authWechatInfo: false
        });
      }
    })
  },
  /*是否已获取用户信息*/
  onLaunch() {
    let isAuthSuccess = wx.getStorageSync("isAuthSuccess");
    wx.getSetting({
      success: res => {
        if(res.authSetting["scope.userInfo"] && isAuthSuccess){
          this.setData({
            authWechatInfo: true
          });
        } else {
          this.setData({
            authWechatInfo: false
          });
        }
      }
    });
  },
  /*微信登录*/
  getWechatUserInfo() {
    wx.getSetting({
      success: (re) => {
        if(re.authSetting["scope.userInfo"]){
          wx.login({
            success: (login) => {
              let js_code = login.code;  //登录凭证
              if(js_code){
                wx.getUserInfo({
                  success: (res) => {
                    showLoading("授权中...");
                    console.log(js_code)
                    console.log(res)
                    wxRequest.postRequest(api.login(),{
                      "js_code": js_code,
                      "encryptedData": res.encryptedData,
                      "iv": res.iv
                    })
                      .then((res) => {
                        wx.hideLoading();
                        if(res.status == 1){
                          wx.setStorageSync("isAuthSuccess", true);
                          wx.setStorageSync('access_token', res.data.access_token)
                          wx.setStorageSync('bindOauthId', res.data.bind_oauth_id)
                          showToast("授权成功，立即绑定手机");
                          setTimeout(() => {
                            this.setData({
                              bindOauthId: res.data.bind_oauth_id,
                              authWechatInfo: true
                            });
                          }, 2000);
                        } else {
                          showToast(res.msg);
                        }
                      })
                  },
                  fail: () => {
                    showToast("获取用户信息失败");
                  }
                })
              } else {
                showToast("获取用户登录态失败！" + r.errMsg);
              }
            },
            fail: () => {
              showToast("登录失败");
            }
          })
        } else {
          showToast("获取用户信息失败");
        }
      }
    })
  },
  /*获取手机号*/
  getPhoneNumber(e) {
    if (e.detail.encryptedData) {
      showLoading("登录中...");
      wxRequest.postRequest(api.bindMobile(),{
        "bind_oauth_id": this.data.bindOauthId || wx.getStorageSync("bindOauthId"),
        "encryptedData": e.detail.encryptedData,
        "iv": e.detail.iv
      })
        .then((res) => {
          wx.hideLoading();
          if (res.status == 1) {
            let { user_id, access_token } = res.data;
            wx.setStorageSync("loginType", "wechat");
            wx.setStorageSync("userId", user_id);
            wx.setStorageSync("access_token", access_token);
            showToast("登录成功");
            wx.redirectTo({
             url: '/pages/me/index',
           })
          } else {
            showToast(res.msg);
          }
        })
       
    } else {
      showToast("允许授权方可登录");
    }
  }
})