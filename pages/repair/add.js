// pages/info/add.js
var util = require('../../utils/util.js');
var app = getApp();
var token = wx.getStorageSync('token')

Page({
  data: {
    userName: '',
    userPhone: '',
    code: '',
    content: '',
    date: '',
    time: '',
    img:[],
    pics:[],
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
  uploadImg: function (e) {
    let that = this;
    var imgs = that.data.img
    var pics = that.data.pics
    wx.chooseImage({
      count: 1,// 默认9
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://r7mgyt.natappfree.cc/api/sqwuye/common/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            'Authorization': token
          },
          success (res){
            var data =JSON.parse(res.data);
            imgs.push(data.url)
            pics.push('http://r7mgyt.natappfree.cc/'+data.url)
            console.log(imgs)
            that.setData({
              img:imgs,
              pics:pics
            })
            //do something
          }
        })
      }
    })

  },

  delete_this(e){
    var index= e.currentTarget.dataset.src
    var imgs = this.data.img
    var pics = this.data.pics
    console.log(imgs)
    imgs.splice(index,1)
    pics.splice(index,1)
    console.log(imgs)
    this.setData({
      img:imgs,
      pics:pics
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
    data.isSolved = 0;
    data.img = that.data.img.join(',')
    data.faultTime = data.date + " " + data.time+':00'

    data = JSON.stringify(data);
    console.log(data)
    wx.request({
      url: 'http://134.175.114.99/api/sqwuye/sys/repairs/save',
      data: '\r\n--XXX' +
      '\r\nContent-Disposition: form-data; name="repairs"' +
      '\r\n' +
      '\r\n' + data +
      '\r\n--XXX--',
      method: 'post',
      header: {
        'Content-Type': 'multipart/form-data; boundary=XXX',
        'Authorization': token
      },
      success: function (res) {
        var data = res.data
        if (data.code == 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration:10000
          })
          wx.switchTab({
            url: '/pages/index/index'
          });
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'error'
          })
          return false;
        }
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      }
    })
    util.clearError(that);
  },

  onLoad: function (options) {

  },
  onShow() {
    app.hasLogin({})
  }
})