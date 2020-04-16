import config from './config.js'

export default {

  hotSearch: () => { return config + '/api/hot_word' },

  question: () => { return config + '/api/normal_question' },

  questionDetail: () => { return config + '/api/normal_question/' },

  goodsList: () => { return config + '/api/goods' },

  category: () => { return config + '/api/category' },

  getCouponsByUid:() => { return config + '/api/coupon/getCouponsByUid' },

  seckillConfig: () => { return config + '/api/activity/seckillConfig' },

  seckill: () => { return config + '/api/activity/seckill' },

  groupon: () => { return config + '/api/activity/groupon' },

  login: () => { return config + '/api/applet/loginByWechat' },

  bindMobile: () => { return config + '/api/applet/bindMobile' },

  agentMsg: () => { return config + '/api/agent/agentMsg' },

  userAddress: () => { return config + '/api/user_address' },

  updateAddress: () => { return config + '/api/user_address/update' },

  addressDelete: () => { return config + '/api/user_address/delete' },

  getcoupon: () => { return config + '/api/coupon' },

  salesman: () => { return config + '/api/user/salesman' },

  advert: () => { return config + '/api/advert' },

  favorite: () => { return config + '/api/favorite' },

  getUserInfo:() => { return config + '/api/user/getUserInfo' },

  favoriteDelete: () => { return config + '/api/favorite/delete' },

  cart: () => { return config + '/api/cart' },

  deleteCart: () => { return config + '/api/cart/delete' },

  cartUpdate: () => { return config + '/api/cart/update' }
}   