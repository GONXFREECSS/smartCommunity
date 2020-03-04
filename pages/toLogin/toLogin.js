// pages/toLogin/toLogin.js
var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },
  usernameInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      username: e.detail.value
    })
    console.log(e.detail.value);
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
    console.log(e.detail.value);
  },
  formSubmit: function (e) {
    var data = e.detail.value;
    var that = this;
    console.log(data);

    util.getReq('api/denglu/login', data, function (data) {
      console.log(data.token)
      if(data.code==0){
        wx.setStorage({
          key: "token",
          data: data.token
        })
        app.setUserInfo({nickName:'admin'})
        console.log(wx.getStorage('token'))
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
    util.clearError(that);


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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