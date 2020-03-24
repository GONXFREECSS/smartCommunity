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
        url:"",
      },
      {
        name: 'car',
        img: '/img/repair.svg',
        text: '报修工单',
        url:"../repair/add",
      },
      {
        name: 'houseregistration',
        img: '/img/house.svg',
        text: '房屋登记',
        url:"../houseregistration/add",
      },
      {
        name: 'repair',
        img: '/img/dongtai.svg',
        text: '发布动态',
        url:"",
      },
      {
        name: 'issue',
        img: '/img/car.svg',
        text: '停车缴费',
        url:"",
      },
      {
        name: 'tousu',
        img: '/img/tousu.svg',
        text: '投诉反馈',
        url:"/pages/my/feedback",
      },
      {
        name: 'kefu',
        img: '/img/kefu.svg',
        text: '联系客服',
        url:"",
      },
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
  not(){
    wx.lin.showDialog({
      type:"alert",     
      title:"温馨提示",
      content:"此功能正在开发中，敬请期待" ,

    })
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
  
  onShow: function() {},
  onLoad: function() {},
})