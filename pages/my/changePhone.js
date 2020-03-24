// pages/my/changePhone.js
var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    text: '获取验证码', //按钮文字
    currentTime: 60, //倒计时
    disabled: false, //按钮是否禁用
    color: '#1296db',
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail,
    })
  },
  codeInput(e) {
    this.setData({
      code: e.detail
    })
  },
  sendCode() {
    var that = this
    var phone = this.data.phone
    var currentTime = that.data.currentTime
    if (phone == '') {
      wx.showModal({
        title: '提示',
        content: "号码不能为空"
      })
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      wx.showModal({
        title: '提示',
        content: "手机号格式不正确"
      })
    } else {
      wx.request({
        url: app.globalData.URL + '/api/sqwuye/app/weChat/phoneCaptcha?phone=' + phone, //仅为示例，并非真实的接口地址
        method: 'get',
        success(res) {
          var data = res.data
          if (data.code == 0) {
            that.setData({
              disabled: true,
              color: '#ccc',
            })
            wx.showToast({
              title: '短信验证码已发送',
              icon: 'none',
              duration: 2000
            });

            //设置一分钟的倒计时
            var interval = setInterval(function () {
              currentTime--; //每执行一次让倒计时秒数减一
              that.setData({
                text: currentTime + 's', //按钮文字变成倒计时对应秒数
              })
              //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获         取验证码的按钮恢复到初始化状态只改变按钮文字
              if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                  text: '重新发送',
                  currentTime: 61,
                  disabled: false,
                  color: '#929fff'
                })
              }
            }, 1000)
          }
        }
      })
    }
  },
  submit() {
    var that = this
    var data = {}
    var token = wx.getStorageSync("token")
    var userInfo = wx.getStorageSync("userInfo")
    data.phone = that.data.phone;
    data.code = that.data.code
    data.id = userInfo.id
    if (data.phone == '') {
      wx.showToast({
        title: '请输入手机号~',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    if (data.code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    if (!(/^1[34578]\d{9}$/.test(data.phone))) {
      wx.showToast({
        title: '手机号码错误~',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    wx.request({
      url: "http://9gi8hu.natappfree.cc/api/sqwuye/app/weChat/weChatUser/update",
      method: "post",
      data: data,
      header: {
        'Authorization': token
      },
      success(res) {
        if (res.data.code == 0) {
          userInfo.phone = data.phone
          app.setUserInfo(userInfo)
          wx.lin.showToast({
            title: '修改成功~',
            icon: 'success',
            success: (res) => {

            },
            complete: (res) => {
              console.log(res)
            }
          })
          wx.navigateBack({//返回
            delta: 1
          })
        }
      }
    })



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