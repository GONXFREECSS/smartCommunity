//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    customitem: '全部',
    adUrls: null,
    indicatorDots: true,
    autoplay: true,
    duration: 1000,
    interval: 5000,
    communityservice: [{
        name: 'issue',
        img: '/img/opendoor.svg',
        text: '远程开门',
        cb: 'issue'
      },
      {
        name: 'car',
        img: '/img/pwd.svg',
        text: '动态密码',
        cb: 'car'
      },
      {
        name: 'houseregistration',
        img: '/img/house.svg',
        text: '房屋登记',
        cb: 'houseregistration'
      },
      {
        name: 'repair',
        img: '/img/repair.svg',
        text: '物业报修',
        cb: 'repair'
      }
    ],
    notices:[
      {
        title:'物业扫雪，温暖业主',
        id:'',
        img:'/img/saoxue.jpg',
        time:'2020-03-09 16:54',
        cb:'notice'
      },
      {
        id:'',
        title:'防控疫情我们在行动',
        img:'/img/yiqing.jpeg',
        time:'2020-03-09 16:54',
        cb:'notice'
      },
    ],
    show: false,
    text: ''
  },
  isLogin: function() {
    return new Promise((resolve, reject) => {
      // 判断是否已经获取过用户信息
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  getAd() {
    util.req('adv/list', {}, function(res) {
      if (res.status === 1) {
        app.globalData.ad = res.list.map(item => {
          item.cover = app.globalData.URL + item.cover
          return item
        })
      }
    })
  },
  repair: function() {
    wx.navigateTo({
      url: '/pages/repair/add',
    })
  },
  houseregistration: function(){
    wx.navigateTo({
      url: '/pages/houseregistration/add',
    })
  },
  onShow: function() {},
  onLoad: function() {},
})