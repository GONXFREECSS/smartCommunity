// pages/info/add.js
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    userName: '',
    userPhone: '',
    code: '',
    content: '',
    date: '',
    time: ''
  },
  usernameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  PhoneInput: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  CodeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  formSubmit: function (e) {
    var data = e.detail.value;
    var that = this;

    if (data.userName == '') {
      util.isError('请输入姓名', that);
      return false;
    }


    if (data.userPhone == '') {
      util.isError('请输入手机号码', that);
      return false;
    }

    if (!(/^1[34578]\d{9}$/.test(data.userPhone))) {
      util.isError('手机号码错误', that);
      return false;
    }

    if (data.faultTime == '请选择时间') {
      util.isError('请选择故障发生时间', that);
      return false;
    }

    data.code = that.data.code;
    data.faultTime = data.date+" "+data.time;

    console.log(data)
    util.req('api/sqwuye/sys/repairs/save', data, function (data) {
      if (data.status == 1) {
        wx.redirectTo({
          url: '/pages/info/index?id=' + data.info
        });
      } else {
        wx.showToast({
          title: '提交失败',
          icon: 'error'
        })
        return false;
      }
    })
    util.clearError(that);
  },

  onLoad: function (options) {

  },
  onShow() {

  }
})