//logs.js
const util = require('../../utils/util.js')
import wxRequest from '../../utils/request.js'
import api from '../../utils/api.js'
Page({
  data: {
    logs: [],
    list:[],
    total:'',
    shopNum:[],
    allSelect:[],
    count_pay:0
  },
  goinPay(){
    wx.navigateTo({
      url: '/pages/address/index',
    })
  },
  getCartList(){
    wxRequest.getRequest(api.cart(),{})
    .then(res=>{
  
      this.setData({
        list: res.data.valid_list,
        total: res.data.total_money
      })
    })
  },
  allSelectData(){
    let query = wx.createSelectorQuery()
    query.selectAll('.deplay').boundingClientRect(res => {
      let arr = res.map(item=>{
        return item.dataset.id
      })
      this.setData({
        allSelect: arr,
        shopNum:arr
      })
      console.log(this.data.allSelect)
    }).exec()
  },
  deleteCart(){
    wxRequest.postRequest(api.deleteCart(), { cart_ids :''})
    .then(res=>{
      if(res.status == 1){
        wx.showToast({
          icon:'none',
          title: res.data.msg,
        })
      }
    })
  },
  cartUpdatePut(e) {
    let num = e.currentTarget.dataset.num - 1
    let id = e.currentTarget.dataset.id
    wxRequest.postRequest(api.cartUpdate(), {
      buy_num: num,
      cart_id: id
    }).then(res => {
      console.log(res)
      this.setData({
        count_pay: res.data.count
      })
      this.getCartList()
    })
  },
  cartUpdateAdd(e){
    let num = e.currentTarget.dataset.num + 1
    let id = e.currentTarget.dataset.id
    wxRequest.postRequest(api.cartUpdate(),{
      buy_num: num,
      cart_id: id
    }).then(res=>{
        console.log(res)
        this.setData({
          count_pay: res.data.count
        })
      this.getCartList()
    })
  },
  allTotal(){
    let arr = this.data.allSelect
    this.setData({
      shopNum:arr
    })
  },
  getShop(e){
    let item_data = e.currentTarget.dataset.cart_id
    if(this.data.shopNum.length  == 0){
      this.setData({
        shopNum: [item_data]
      })
    }else{
      let arr = this.data.shopNum
      let checkCar = arr.forEach((item,index) =>{
       if (item == item_data){
          arr.splice(index,1)
          this.setData({
            shopNum: arr
          })
        }else{
          this.setData({
            shopNum: [...arr, item_data]
          })
        }
      })
    }
    console.log(this.data.shopNum)
  },
  onShow: function () {
    this.getCartList()
  }
})
